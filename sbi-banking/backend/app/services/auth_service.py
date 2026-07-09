import json
import uuid
import logging
from datetime import datetime, timezone, time
from typing import Optional, Tuple

from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Request

from app.models.models import User, UserStatus, UserRole
from app.core.security import (
    verify_password, hash_password,
    create_access_token, create_refresh_token,
    decode_token, generate_otp
)
from app.db.redis import set_otp, get_otp, delete_otp, set_session, get_session, delete_session, get_captcha
from app.schemas.schemas import LoginRequest, TokenResponse, UserResponse

logger = logging.getLogger(__name__)

MAX_FAILED_ATTEMPTS = 5


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, user_id: str) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def authenticate_user(db: Session, username: str, password: str) -> Tuple[Optional[User], str]:
    """Returns (user, error_message). error_message is empty on success."""
    user = get_user_by_username(db, username)

    if not user:
        return None, "Invalid username or password"

    if user.status == UserStatus.LOCKED:
        return None, "Account is locked. Please contact your branch."

    if user.status == UserStatus.SUSPENDED:
        return None, "Account is suspended. Please contact support."

    if not verify_password(password, user.hashed_password):
        user.failed_login_attempts += 1
        if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
            user.status = UserStatus.LOCKED
            db.commit()
            return None, f"Account locked after {MAX_FAILED_ATTEMPTS} failed attempts."
        db.commit()
        remaining = MAX_FAILED_ATTEMPTS - user.failed_login_attempts
        return None, f"Invalid password. {remaining} attempts remaining."

    return user, ""


def create_otp_session(user_id: str) -> Tuple[str, str]:
    """Create a pre-auth session and OTP. Returns (session_token, otp)."""
    session_token = str(uuid.uuid4())
    otp = generate_otp()

    session_data = json.dumps({"user_id": user_id, "otp_verified": False})
    set_session(session_token, session_data, expire_seconds=300)
    set_otp(f"preauth:{user_id}", otp, expire_seconds=300)

    logger.info(f"OTP for user {user_id}: {otp}")  # In prod: send via SMS
    return session_token, otp


def verify_otp_and_login(
    db: Session, session_token: str, otp: str
) -> TokenResponse:
    """Verify OTP and return JWT tokens."""
    session_raw = get_session(session_token)
    if not session_raw:
        raise HTTPException(status_code=400, detail="Session expired. Please login again.")

    session_data = json.loads(session_raw)
    user_id = session_data["user_id"]

    stored_otp = get_otp(f"preauth:{user_id}")
    if not stored_otp or stored_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP.")

    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Cleanup
    delete_otp(f"preauth:{user_id}")
    delete_session(session_token)

    # Update login info
    user.failed_login_attempts = 0
    user.last_login = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(user.id, {"role": user.role.value})
    refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user),
    )


def refresh_access_token(db: Session, refresh_token: str) -> dict:
    payload = decode_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token.")

    user = get_user_by_id(db, payload["sub"])
    if not user or user.status != UserStatus.ACTIVE:
        raise HTTPException(status_code=401, detail="User not found or inactive.")

    access_token = create_access_token(user.id, {"role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}


def change_password(db: Session, user: User, current_password: str, new_password: str) -> None:
    if not verify_password(current_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    user.hashed_password = hash_password(new_password)
    db.commit()


def register_user(
    db: Session,
    account_number: str,
    cif_number: str,
    branch_code: str,
    country_code: str,
    mobile_number: str,
    facility: str,
    captcha_token: str,
    captcha_answer: str,
) -> dict:
    """User-driven (new user) registration.

    Validates the captcha, then creates a PENDING customer account.
    In production this would verify account/CIF/branch/mobile against
    the core banking system; here we create the user record directly.
    """
    # 1) captcha
    stored = get_captcha(captcha_token) if captcha_token else None
    if not stored or stored.upper() != str(captcha_answer).upper():
        raise HTTPException(status_code=400, detail="Invalid captcha")
    delete_session(f"captcha:{captcha_token}")

    # 2) uniqueness checks
    existing = (
        db.query(User)
        .filter((User.phone == mobile_number))
        .first()
    )
    if existing:
        raise HTTPException(status_code=409, detail="Mobile number already registered")

    # 3) create pending user
    username = f"user{account_number[-8:]}"
    suffix = 0
    while get_user_by_username(db, username + (str(suffix) if suffix else "")):
        suffix += 1
    username = username + (str(suffix) if suffix else "")

    temp_password = generate_otp(10)  # demo temporary password
    user = User(
        username=username,
        email=f"{username}@example.com",
        phone=mobile_number,
        full_name=f"Customer {account_number[-4:]}",
        hashed_password=hash_password(temp_password),
        role=UserRole.CUSTOMER,
        status=UserStatus.PENDING,
        is_verified=False,
        address=f"Branch {branch_code}, Country {country_code}",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "username": username,
        "status": user.status.value,
        "message": "Registration submitted. Your username is pending activation. (Demo temp password: "
        + temp_password
        + ")",
    }


def activate_user(
    db: Session,
    temp_username: str,
    cif_number: str,
    date_of_birth: str,
    captcha_token: str,
    captcha_answer: str,
) -> dict:
    """Activate a pending username using temp username + CIF + DOB."""
    # 1) captcha
    stored = get_captcha(captcha_token) if captcha_token else None
    if not stored or stored.upper() != str(captcha_answer).upper():
        raise HTTPException(status_code=400, detail="Invalid captcha")
    delete_session(f"captcha:{captcha_token}")

    # 2) find the pending user
    user = db.query(User).filter(User.username == temp_username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Temporary username not found")
    if user.status != UserStatus.PENDING:
        raise HTTPException(status_code=400, detail="Username is not pending activation")

    # 3) verify CIF (stored on registration in address string? use cif check loosely)
    # In production CIF would be matched against core banking. Here we accept the CIF provided.
    # 4) parse DOB
    try:
        dob = datetime.strptime(date_of_birth, "%d/%m/%Y")
    except ValueError:
        raise HTTPException(status_code=400, detail="Date of Birth must be in dd/mm/yyyy format")

    user.status = UserStatus.ACTIVE
    user.is_verified = True
    user.date_of_birth = dob.replace(tzinfo=timezone.utc)
    db.commit()
    db.refresh(user)

    return {
        "username": user.username,
        "status": user.status.value,
        "message": "Username activated successfully. You can now login with your credentials.",
    }
