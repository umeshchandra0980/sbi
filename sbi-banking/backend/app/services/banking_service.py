import uuid
import random
import logging
from decimal import Decimal
from datetime import datetime, timezone
from typing import List, Optional, Tuple

from sqlalchemy.orm import Session
from sqlalchemy import desc, and_, or_, func
from fastapi import HTTPException

from app.models.models import (
    Account, Transaction, Transfer, Beneficiary, User,
    AccountStatus, TransactionType, TransactionCategory, TransferStatus
)
from app.schemas.schemas import (
    AccountCreate, TransferCreate, BeneficiaryCreate,
    TransactionFilter
)
from app.db.redis import set_otp, get_otp, delete_otp
from app.core.security import generate_otp

logger = logging.getLogger(__name__)


def generate_account_number() -> str:
    return "".join([str(random.randint(0, 9)) for _ in range(11)])


def generate_ref() -> str:
    return f"SBI{uuid.uuid4().hex[:18].upper()}"


# ── Account Service ───────────────────────────────────────────
def create_account(db: Session, user_id: str, data: AccountCreate) -> Account:
    account = Account(
        id=str(uuid.uuid4()),
        user_id=user_id,
        account_number=generate_account_number(),
        account_type=data.account_type,
        branch_code=data.branch_code or "001",
        branch_name=data.branch_name or "Main Branch",
        ifsc_code=data.ifsc_code or "SBIN0000001",
        nominee_name=data.nominee_name,
        is_primary=data.is_primary,
        balance=Decimal("0.00"),
        available_balance=Decimal("0.00"),
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


def get_user_accounts(db: Session, user_id: str) -> List[Account]:
    return db.query(Account).filter(Account.user_id == user_id).all()


def get_account(db: Session, account_id: str, user_id: str = None) -> Account:
    q = db.query(Account).filter(Account.id == account_id)
    if user_id:
        q = q.filter(Account.user_id == user_id)
    acc = q.first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    return acc


def get_account_by_number(db: Session, account_number: str) -> Optional[Account]:
    return db.query(Account).filter(Account.account_number == account_number).first()


# ── Transaction Service ───────────────────────────────────────
def get_transactions(
    db: Session,
    account_id: str,
    filters: TransactionFilter = None,
    page: int = 1,
    page_size: int = 20,
) -> Tuple[List[Transaction], int]:
    q = db.query(Transaction).filter(Transaction.account_id == account_id)

    if filters:
        if filters.from_date:
            q = q.filter(Transaction.value_date >= filters.from_date)
        if filters.to_date:
            q = q.filter(Transaction.value_date <= filters.to_date)
        if filters.type:
            q = q.filter(Transaction.type == filters.type)
        if filters.category:
            q = q.filter(Transaction.category == filters.category)
        if filters.min_amount:
            q = q.filter(Transaction.amount >= filters.min_amount)
        if filters.max_amount:
            q = q.filter(Transaction.amount <= filters.max_amount)
        if filters.search:
            term = f"%{filters.search}%"
            q = q.filter(
                or_(
                    Transaction.description.ilike(term),
                    Transaction.counterparty_name.ilike(term),
                    Transaction.transaction_ref.ilike(term),
                )
            )

    total = q.count()
    items = q.order_by(desc(Transaction.value_date)).offset((page - 1) * page_size).limit(page_size).all()
    return items, total


def get_recent_transactions(db: Session, account_id: str, limit: int = 5) -> List[Transaction]:
    return (
        db.query(Transaction)
        .filter(Transaction.account_id == account_id)
        .order_by(desc(Transaction.value_date))
        .limit(limit)
        .all()
    )


# ── Transfer Service ──────────────────────────────────────────
def initiate_transfer(db: Session, user_id: str, data: TransferCreate) -> Tuple[Transfer, str]:
    from_account = get_account(db, data.from_account_id, user_id)

    if from_account.status != AccountStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="Source account is not active.")

    if from_account.available_balance < data.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance.")

    # Check if internal transfer
    to_account = get_account_by_number(db, data.beneficiary_account)

    transfer = Transfer(
        id=str(uuid.uuid4()),
        from_account_id=from_account.id,
        to_account_id=to_account.id if to_account else None,
        transfer_ref=generate_ref(),
        transfer_type=data.transfer_type,
        amount=data.amount,
        status=TransferStatus.PENDING,
        beneficiary_name=data.beneficiary_name,
        beneficiary_account=data.beneficiary_account,
        beneficiary_ifsc=data.beneficiary_ifsc,
        beneficiary_bank=data.beneficiary_bank,
        remarks=data.remarks,
    )
    db.add(transfer)
    db.commit()
    db.refresh(transfer)

    # Generate OTP
    otp = generate_otp()
    set_otp(f"transfer:{transfer.id}", otp, expire_seconds=300)
    logger.info(f"Transfer OTP for {transfer.transfer_ref}: {otp}")

    return transfer, otp


def confirm_transfer(db: Session, user_id: str, transfer_id: str, otp: str) -> Transfer:
    transfer = db.query(Transfer).filter(Transfer.id == transfer_id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found.")

    from_account = get_account(db, transfer.from_account_id, user_id)

    stored_otp = get_otp(f"transfer:{transfer_id}")
    if not stored_otp or stored_otp != otp:
        transfer.status = TransferStatus.FAILED
        transfer.failure_reason = "Invalid OTP"
        db.commit()
        raise HTTPException(status_code=400, detail="Invalid or expired OTP.")

    delete_otp(f"transfer:{transfer_id}")

    # Process transfer
    transfer.status = TransferStatus.PROCESSING
    db.commit()

    try:
        # Debit from source
        from_account.balance -= transfer.amount
        from_account.available_balance -= transfer.amount

        # Credit to destination if internal
        if transfer.to_account_id:
            to_account = db.query(Account).filter(Account.id == transfer.to_account_id).first()
            if to_account:
                to_account.balance += transfer.amount
                to_account.available_balance += transfer.amount

                credit_txn = Transaction(
                    id=str(uuid.uuid4()),
                    account_id=to_account.id,
                    transaction_ref=generate_ref(),
                    type=TransactionType.CREDIT,
                    category=TransactionCategory.TRANSFER,
                    amount=transfer.amount,
                    balance_after=to_account.balance,
                    description=f"Transfer from {from_account.account_number}",
                    counterparty_name=from_account.user.full_name if from_account.user else None,
                    counterparty_account=from_account.account_number,
                    remarks=transfer.remarks,
                )
                db.add(credit_txn)

        # Create debit transaction
        debit_txn = Transaction(
            id=str(uuid.uuid4()),
            account_id=from_account.id,
            transaction_ref=generate_ref(),
            type=TransactionType.DEBIT,
            category=TransactionCategory.TRANSFER,
            amount=transfer.amount,
            balance_after=from_account.balance,
            description=f"Transfer to {transfer.beneficiary_name}",
            counterparty_name=transfer.beneficiary_name,
            counterparty_account=transfer.beneficiary_account,
            counterparty_ifsc=transfer.beneficiary_ifsc,
            remarks=transfer.remarks,
        )
        db.add(debit_txn)

        transfer.status = TransferStatus.COMPLETED
        transfer.otp_verified = True
        transfer.processed_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(transfer)
        return transfer

    except Exception as e:
        logger.error(f"Transfer processing error: {e}")
        transfer.status = TransferStatus.FAILED
        transfer.failure_reason = str(e)
        db.commit()
        raise HTTPException(status_code=500, detail="Transfer processing failed.")


def get_user_transfers(db: Session, user_id: str, page: int = 1, page_size: int = 20):
    user_accounts = db.query(Account.id).filter(Account.user_id == user_id).subquery()
    q = db.query(Transfer).filter(Transfer.from_account_id.in_(user_accounts))
    total = q.count()
    items = q.order_by(desc(Transfer.created_at)).offset((page - 1) * page_size).limit(page_size).all()
    return items, total


# ── Beneficiary Service ───────────────────────────────────────
def add_beneficiary(db: Session, user_id: str, data: BeneficiaryCreate) -> Beneficiary:
    b = Beneficiary(
        id=str(uuid.uuid4()),
        user_id=user_id,
        account_number=data.account_number,
        ifsc_code=data.ifsc_code,
        bank_name=data.bank_name,
        beneficiary_name=data.beneficiary_name,
        nickname=data.nickname,
    )
    db.add(b)
    db.commit()
    db.refresh(b)
    return b


def get_beneficiaries(db: Session, user_id: str) -> List[Beneficiary]:
    return db.query(Beneficiary).filter(Beneficiary.user_id == user_id).all()
