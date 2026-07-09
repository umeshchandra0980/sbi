import math
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, TransactionType, TransactionCategory
from app.schemas.schemas import TransactionFilter, PaginatedResponse, TransactionResponse
from app.services.banking_service import get_transactions, get_account

router = APIRouter()


@router.get("/{account_id}")
def list_transactions(
    account_id: str,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None,
    type: Optional[TransactionType] = None,
    category: Optional[TransactionCategory] = None,
    min_amount: Optional[float] = None,
    max_amount: Optional[float] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify account belongs to user
    get_account(db, account_id, current_user.id)

    filters = TransactionFilter(
        from_date=from_date,
        to_date=to_date,
        type=type,
        category=category,
        min_amount=min_amount,
        max_amount=max_amount,
        search=search,
    )
    items, total = get_transactions(db, account_id, filters, page, page_size)
    pages = math.ceil(total / page_size) if total else 1

    return {
        "items": [TransactionResponse.model_validate(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": pages,
    }
