from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.schemas.schemas import AccountCreate, AccountResponse
from app.services.banking_service import create_account, get_user_accounts, get_account

router = APIRouter()


@router.get("/", response_model=List[AccountResponse])
def list_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_accounts(db, current_user.id)


@router.post("/", response_model=AccountResponse)
def create_new_account(
    data: AccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_account(db, current_user.id, data)


@router.get("/{account_id}", response_model=AccountResponse)
def get_account_detail(
    account_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_account(db, account_id, current_user.id)
