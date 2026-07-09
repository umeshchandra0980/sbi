from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.schemas.schemas import DashboardResponse, UserResponse, AccountSummary, TransactionResponse
from app.services.banking_service import get_user_accounts, get_recent_transactions

router = APIRouter()


@router.get("/", response_model=DashboardResponse)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    accounts = get_user_accounts(db, current_user.id)
    total_balance = sum(a.balance for a in accounts) if accounts else Decimal("0")

    recent_txns = []
    if accounts:
        primary = next((a for a in accounts if a.is_primary), accounts[0])
        recent_txns = get_recent_transactions(db, primary.id, limit=10)

    return DashboardResponse(
        user=UserResponse.model_validate(current_user),
        accounts=[AccountSummary.model_validate(a) for a in accounts],
        recent_transactions=[TransactionResponse.model_validate(t) for t in recent_txns],
        total_balance=total_balance,
        total_accounts=len(accounts),
    )
