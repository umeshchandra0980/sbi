import math
import uuid
import string
import random
from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, Query, HTTPException, Request
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, desc, or_
from decimal import Decimal

from app.db.session import get_db
from app.api.deps import get_current_admin, get_current_super_admin, write_audit_log
from app.models.models import (
    User, Account, Transaction, Transfer, AuditLog,
    UserRole, UserStatus, AccountStatus, TransferStatus,
)
from app.schemas.schemas import (
    AdminStatsResponse, UserAdminResponse, UserDetailResponse,
    UserCreate, UserUpdate, RoleChangeRequest,
    AccountResponse, TransactionResponse, TransferResponse,
    AuditLogResponse, MessageResponse,
)
from app.core.security import hash_password

router = APIRouter()


# ── Helpers ──────────────────────────────────────────────────
def _get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _check_manager_target(admin: User, target: User):
    """Managers can only manage customers."""
    if admin.role == UserRole.MANAGER and target.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Managers can only manage customer accounts",
        )


def _check_self_action(admin: User, target_id: str, action: str):
    """Nobody can perform destructive actions on themselves."""
    if admin.id == target_id:
        raise HTTPException(
            status_code=400,
            detail=f"You cannot {action} your own account",
        )


# ── Stats ────────────────────────────────────────────────────
@router.get("/stats", response_model=AdminStatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    today_start = datetime.combine(date.today(), datetime.min.time()).replace(tzinfo=timezone.utc)
    total_balance = db.query(func.sum(Account.balance)).scalar() or Decimal("0")

    return AdminStatsResponse(
        total_users=db.query(User).count(),
        active_users=db.query(User).filter(User.status == UserStatus.ACTIVE).count(),
        locked_users=db.query(User).filter(User.status == UserStatus.LOCKED).count(),
        total_accounts=db.query(Account).count(),
        total_balance=total_balance,
        total_transactions_today=db.query(Transaction).filter(Transaction.created_at >= today_start).count(),
        total_transfers_today=db.query(Transfer).filter(Transfer.created_at >= today_start).count(),
        pending_transfers=db.query(Transfer).filter(Transfer.status == TransferStatus.PENDING).count(),
    )


# ── Users: List ──────────────────────────────────────────────
@router.get("/users")
def list_users(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    role: str = Query(default=""),
    status: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(User)
    if search:
        term = f"%{search}%"
        q = q.filter(
            or_(User.username.ilike(term), User.email.ilike(term), User.full_name.ilike(term))
        )
    if role:
        q = q.filter(User.role == role)
    if status:
        q = q.filter(User.status == status)

    total = q.count()
    items = q.order_by(User.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return {
        "items": [UserAdminResponse.model_validate(u) for u in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }


# ── Users: Create ────────────────────────────────────────────
@router.post("/users", response_model=UserAdminResponse)
def create_user(
    data: UserCreate,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    # Managers can only create customers
    if admin.role == UserRole.MANAGER and data.role != UserRole.CUSTOMER:
        raise HTTPException(status_code=403, detail="Managers can only create customer accounts")

    if len(data.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        id=str(uuid.uuid4()),
        username=data.username,
        email=data.email,
        phone=data.phone,
        full_name=data.full_name,
        hashed_password=hash_password(data.password),
        role=data.role,
        is_verified=True,
    )
    db.add(user)

    write_audit_log(
        db, admin, "create_user", "user", user.id,
        ip_address=_get_client_ip(request),
        details=f"Created user {data.username} with role {data.role.value}",
    )

    db.commit()
    db.refresh(user)
    return user


# ── Users: Detail ────────────────────────────────────────────
@router.get("/users/{user_id}", response_model=UserDetailResponse)
def get_user_detail(
    user_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = (
        db.query(User)
        .options(joinedload(User.accounts))
        .filter(User.id == user_id)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ── Users: Edit Profile ─────────────────────────────────────
@router.patch("/users/{user_id}", response_model=UserAdminResponse)
def edit_user(
    user_id: str,
    data: UserUpdate,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    _check_manager_target(admin, user)

    changes = []
    if data.email is not None:
        existing = db.query(User).filter(User.email == data.email, User.id != user_id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        user.email = data.email
        changes.append("email")
    if data.phone is not None:
        user.phone = data.phone
        changes.append("phone")
    if data.full_name is not None:
        user.full_name = data.full_name
        changes.append("full_name")
    if data.address is not None:
        user.address = data.address
        changes.append("address")

    write_audit_log(
        db, admin, "edit_user", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Updated fields: {', '.join(changes) if changes else 'none'}",
    )

    db.commit()
    db.refresh(user)
    return user


# ── Users: Change Role (ADMIN only) ─────────────────────────
@router.patch("/users/{user_id}/role", response_model=MessageResponse)
def change_user_role(
    user_id: str,
    data: RoleChangeRequest,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_super_admin),
):
    _check_self_action(admin, user_id, "change role of")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    old_role = user.role.value
    user.role = data.role

    write_audit_log(
        db, admin, "change_role", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Changed role from {old_role} to {data.role.value}",
    )

    db.commit()
    return MessageResponse(message=f"Role changed from {old_role} to {data.role.value}")


# ── Users: Reset Password (ADMIN only) ──────────────────────
@router.post("/users/{user_id}/reset-password")
def reset_user_password(
    user_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_super_admin),
):
    _check_self_action(admin, user_id, "reset password of")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Generate a temporary password (8 alphanumeric + special chars)
    temp_password = "".join(random.choices(string.ascii_letters + string.digits, k=10)) + "A1!"
    user.hashed_password = hash_password(temp_password)

    write_audit_log(
        db, admin, "reset_password", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Password reset for user {user.username}",
    )

    db.commit()
    return {"message": f"Password reset for {user.username}", "temporary_password": temp_password}


# ── Users: Lock ──────────────────────────────────────────────
@router.patch("/users/{user_id}/lock", response_model=MessageResponse)
def lock_user(
    user_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    _check_self_action(admin, user_id, "lock")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    _check_manager_target(admin, user)

    user.status = UserStatus.LOCKED

    write_audit_log(
        db, admin, "lock_user", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Locked user {user.username}",
    )

    db.commit()
    return MessageResponse(message=f"User {user.username} locked.")


# ── Users: Unlock ────────────────────────────────────────────
@router.patch("/users/{user_id}/unlock", response_model=MessageResponse)
def unlock_user(
    user_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    _check_manager_target(admin, user)

    user.status = UserStatus.ACTIVE
    user.failed_login_attempts = 0

    write_audit_log(
        db, admin, "unlock_user", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Unlocked user {user.username}",
    )

    db.commit()
    return MessageResponse(message=f"User {user.username} unlocked.")


# ── Users: Suspend ───────────────────────────────────────────
@router.patch("/users/{user_id}/suspend", response_model=MessageResponse)
def suspend_user(
    user_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    _check_self_action(admin, user_id, "suspend")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    _check_manager_target(admin, user)

    user.status = UserStatus.SUSPENDED

    write_audit_log(
        db, admin, "suspend_user", "user", user_id,
        ip_address=_get_client_ip(request),
        details=f"Suspended user {user.username}",
    )

    db.commit()
    return MessageResponse(message=f"User {user.username} suspended.")


# ── Accounts: List ───────────────────────────────────────────
@router.get("/accounts")
def list_accounts(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    status: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(Account).join(User, Account.user_id == User.id)
    if search:
        term = f"%{search}%"
        q = q.filter(
            or_(
                Account.account_number.ilike(term),
                User.full_name.ilike(term),
                User.username.ilike(term),
            )
        )
    if status:
        q = q.filter(Account.status == status)

    total = q.count()
    accounts = q.order_by(Account.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for acc in accounts:
        data = AccountResponse.model_validate(acc).model_dump()
        data["owner_name"] = acc.user.full_name if acc.user else None
        data["owner_username"] = acc.user.username if acc.user else None
        items.append(data)

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }


# ── Accounts: Freeze ────────────────────────────────────────
@router.patch("/accounts/{account_id}/freeze", response_model=MessageResponse)
def freeze_account(
    account_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    owner = db.query(User).filter(User.id == account.user_id).first()
    if owner:
        _check_manager_target(admin, owner)

    account.status = AccountStatus.FROZEN

    write_audit_log(
        db, admin, "freeze_account", "account", account_id,
        ip_address=_get_client_ip(request),
        details=f"Frozen account {account.account_number}",
    )

    db.commit()
    return MessageResponse(message=f"Account {account.account_number} frozen.")


# ── Accounts: Unfreeze ──────────────────────────────────────
@router.patch("/accounts/{account_id}/unfreeze", response_model=MessageResponse)
def unfreeze_account(
    account_id: str,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    owner = db.query(User).filter(User.id == account.user_id).first()
    if owner:
        _check_manager_target(admin, owner)

    account.status = AccountStatus.ACTIVE

    write_audit_log(
        db, admin, "unfreeze_account", "account", account_id,
        ip_address=_get_client_ip(request),
        details=f"Unfrozen account {account.account_number}",
    )

    db.commit()
    return MessageResponse(message=f"Account {account.account_number} unfrozen.")


# ── Transactions: List ───────────────────────────────────────
@router.get("/transactions")
def list_all_transactions(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    type: str = Query(default=""),
    category: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(Transaction).order_by(desc(Transaction.created_at))
    if search:
        term = f"%{search}%"
        q = q.filter(
            or_(Transaction.transaction_ref.ilike(term), Transaction.description.ilike(term))
        )
    if type:
        q = q.filter(Transaction.type == type)
    if category:
        q = q.filter(Transaction.category == category)

    total = q.count()
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return {
        "items": [TransactionResponse.model_validate(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }


# ── Transfers: List ─────────────────────────────────────────
@router.get("/transfers")
def list_all_transfers(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    status: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(Transfer).order_by(desc(Transfer.created_at))
    if search:
        term = f"%{search}%"
        q = q.filter(
            or_(Transfer.transfer_ref.ilike(term), Transfer.beneficiary_name.ilike(term))
        )
    if status:
        q = q.filter(Transfer.status == status)

    total = q.count()
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return {
        "items": [TransferResponse.model_validate(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }


# ── Audit Logs: List ────────────────────────────────────────
@router.get("/audit-logs")
def list_audit_logs(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    action: str = Query(default=""),
    resource: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(AuditLog).options(joinedload(AuditLog.user)).order_by(desc(AuditLog.created_at))
    if action:
        q = q.filter(AuditLog.action == action)
    if resource:
        q = q.filter(AuditLog.resource == resource)

    total = q.with_entities(func.count(AuditLog.id)).scalar()
    logs = q.offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for log in logs:
        data = AuditLogResponse.model_validate(log).model_dump()
        if log.user:
            data["admin_username"] = log.user.username
        items.append(data)

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }
