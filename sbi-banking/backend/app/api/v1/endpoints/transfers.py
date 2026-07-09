import math
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.schemas.schemas import (
    TransferCreate, TransferOTPRequest, TransferResponse,
    BeneficiaryCreate, BeneficiaryResponse, MessageResponse
)
from app.services.banking_service import (
    initiate_transfer, confirm_transfer, get_user_transfers,
    add_beneficiary, get_beneficiaries
)

router = APIRouter()


@router.post("/initiate", response_model=TransferResponse)
def initiate(
    data: TransferCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transfer, otp = initiate_transfer(db, current_user.id, data)
    resp = TransferResponse.model_validate(transfer)
    # In dev mode, attach OTP to response so frontend can display it
    return {**resp.model_dump(), "demo_otp": otp}


@router.post("/confirm", response_model=TransferResponse)
def confirm(
    data: TransferOTPRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return confirm_transfer(db, current_user.id, data.transfer_id, data.otp)


@router.get("/")
def list_transfers(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    items, total = get_user_transfers(db, current_user.id, page, page_size)
    pages = math.ceil(total / page_size) if total else 1
    return {
        "items": [TransferResponse.model_validate(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": pages,
    }


# ── Beneficiaries ─────────────────────────────────────────────
@router.get("/beneficiaries", response_model=List[BeneficiaryResponse])
def list_beneficiaries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_beneficiaries(db, current_user.id)


@router.post("/beneficiaries", response_model=BeneficiaryResponse)
def add_new_beneficiary(
    data: BeneficiaryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return add_beneficiary(db, current_user.id, data)
