import math
from decimal import Decimal
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.models import User, Account, Transaction, Transfer, UserStatus, TransferStatus
from app.schemas.schemas import (
    AdminStatsResponse, UserAdminResponse, UserCreate, MessageResponse
)
from app.core.security import hash_password
import uuid

router = APIRouter()


@router.get("/stats", response_model=AdminStatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    from datetime import date, datetime, timezone
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


@router.get("/users")
def list_users(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    q = db.query(User)
    if search:
        term = f"%{search}%"
        q = q.filter(
            (User.username.ilike(term)) | (User.email.ilike(term)) | (User.full_name.ilike(term))
        )
    total = q.count()
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return {
        "items": [UserAdminResponse.model_validate(u) for u in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }


@router.post("/users", response_model=UserAdminResponse)
def create_user(
    data: UserCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
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
    db.commit()
    db.refresh(user)
    return user


@router.patch("/users/{user_id}/lock", response_model=MessageResponse)
def lock_user(
    user_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.status = UserStatus.LOCKED
    db.commit()
    return MessageResponse(message=f"User {user.username} locked.")


@router.patch("/users/{user_id}/unlock", response_model=MessageResponse)
def unlock_user(
    user_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.status = UserStatus.ACTIVE
    user.failed_login_attempts = 0
    db.commit()
    return MessageResponse(message=f"User {user.username} unlocked.")


@router.get("/transactions")
def list_all_transactions(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    from sqlalchemy import desc
    from app.schemas.schemas import TransactionResponse
    q = db.query(Transaction).order_by(desc(Transaction.created_at))
    total = q.count()
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return {
        "items": [TransactionResponse.model_validate(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": math.ceil(total / page_size) if total else 1,
    }
