import enum
import uuid
from decimal import Decimal

from sqlalchemy import (
    Boolean, Column, DateTime, Enum, ForeignKey,
    Numeric, String, Text, Integer, Index, func
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


# ── Enums ────────────────────────────────────────────────────
class UserRole(str, enum.Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"
    MANAGER = "manager"


class UserStatus(str, enum.Enum):
    ACTIVE = "active"
    LOCKED = "locked"
    SUSPENDED = "suspended"
    PENDING = "pending"


class AccountType(str, enum.Enum):
    SAVINGS = "savings"
    CURRENT = "current"
    SALARY = "salary"
    FIXED_DEPOSIT = "fixed_deposit"
    RECURRING_DEPOSIT = "recurring_deposit"


class AccountStatus(str, enum.Enum):
    ACTIVE = "active"
    DORMANT = "dormant"
    CLOSED = "closed"
    FROZEN = "frozen"


class TransactionType(str, enum.Enum):
    CREDIT = "credit"
    DEBIT = "debit"


class TransactionCategory(str, enum.Enum):
    TRANSFER = "transfer"
    NEFT = "neft"
    RTGS = "rtgs"
    IMPS = "imps"
    UPI = "upi"
    ATM = "atm"
    POS = "pos"
    INTEREST = "interest"
    CHARGES = "charges"
    SALARY = "salary"
    OTHER = "other"


class TransferStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REVERSED = "reversed"


# ── User ─────────────────────────────────────────────────────
class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone = Column(String(15), unique=True, nullable=True)
    full_name = Column(String(100), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    status = Column(Enum(UserStatus), default=UserStatus.ACTIVE, nullable=False)
    is_verified = Column(Boolean, default=False)
    failed_login_attempts = Column(Integer, default=0)
    last_login = Column(DateTime(timezone=True), nullable=True)
    profile_image = Column(String(255), nullable=True)
    address = Column(Text, nullable=True)
    pan_number = Column(String(10), nullable=True)
    aadhar_last4 = Column(String(4), nullable=True)
    date_of_birth = Column(DateTime(timezone=True), nullable=True)

    # relationships
    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")

    __table_args__ = (
        Index("ix_users_username_status", "username", "status"),
    )


# ── Account ──────────────────────────────────────────────────
class Account(Base, TimestampMixin):
    __tablename__ = "accounts"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    account_number = Column(String(20), unique=True, nullable=False, index=True)
    account_type = Column(Enum(AccountType), default=AccountType.SAVINGS, nullable=False)
    status = Column(Enum(AccountStatus), default=AccountStatus.ACTIVE, nullable=False)
    balance = Column(Numeric(15, 2), default=Decimal("0.00"), nullable=False)
    available_balance = Column(Numeric(15, 2), default=Decimal("0.00"), nullable=False)
    branch_code = Column(String(10), nullable=True)
    branch_name = Column(String(100), nullable=True)
    ifsc_code = Column(String(11), nullable=True)
    currency = Column(String(3), default="INR")
    interest_rate = Column(Numeric(5, 2), default=Decimal("3.50"))
    nominee_name = Column(String(100), nullable=True)
    is_primary = Column(Boolean, default=False)

    # relationships
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account", cascade="all, delete-orphan")
    outgoing_transfers = relationship("Transfer", foreign_keys="Transfer.from_account_id", back_populates="from_account")
    incoming_transfers = relationship("Transfer", foreign_keys="Transfer.to_account_id", back_populates="to_account")


# ── Transaction ──────────────────────────────────────────────
class Transaction(Base, TimestampMixin):
    __tablename__ = "transactions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    account_id = Column(String(36), ForeignKey("accounts.id", ondelete="CASCADE"), nullable=False)
    transaction_ref = Column(String(30), unique=True, nullable=False, index=True)
    type = Column(Enum(TransactionType), nullable=False)
    category = Column(Enum(TransactionCategory), default=TransactionCategory.OTHER)
    amount = Column(Numeric(15, 2), nullable=False)
    balance_after = Column(Numeric(15, 2), nullable=False)
    description = Column(String(255), nullable=True)
    narration = Column(Text, nullable=True)
    counterparty_name = Column(String(100), nullable=True)
    counterparty_account = Column(String(20), nullable=True)
    counterparty_ifsc = Column(String(11), nullable=True)
    channel = Column(String(20), default="NET_BANKING")
    remarks = Column(Text, nullable=True)
    value_date = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    account = relationship("Account", back_populates="transactions")

    __table_args__ = (
        Index("ix_transactions_account_date", "account_id", "value_date"),
    )


# ── Transfer ─────────────────────────────────────────────────
class Transfer(Base, TimestampMixin):
    __tablename__ = "transfers"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    from_account_id = Column(String(36), ForeignKey("accounts.id"), nullable=False)
    to_account_id = Column(String(36), ForeignKey("accounts.id"), nullable=True)
    transfer_ref = Column(String(30), unique=True, nullable=False, index=True)
    transfer_type = Column(String(10), default="IMPS")  # NEFT, RTGS, IMPS, UPI
    amount = Column(Numeric(15, 2), nullable=False)
    status = Column(Enum(TransferStatus), default=TransferStatus.PENDING)
    beneficiary_name = Column(String(100), nullable=True)
    beneficiary_account = Column(String(20), nullable=True)
    beneficiary_ifsc = Column(String(11), nullable=True)
    beneficiary_bank = Column(String(100), nullable=True)
    remarks = Column(String(255), nullable=True)
    otp_verified = Column(Boolean, default=False)
    processed_at = Column(DateTime(timezone=True), nullable=True)
    failure_reason = Column(Text, nullable=True)

    # relationships
    from_account = relationship("Account", foreign_keys=[from_account_id], back_populates="outgoing_transfers")
    to_account = relationship("Account", foreign_keys=[to_account_id], back_populates="incoming_transfers")


# ── AuditLog ─────────────────────────────────────────────────
class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False)
    resource = Column(String(50), nullable=True)
    resource_id = Column(String(36), nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    status = Column(String(20), default="success")
    details = Column(Text, nullable=True)

    user = relationship("User", back_populates="audit_logs")


# ── Beneficiary ──────────────────────────────────────────────
class Beneficiary(Base, TimestampMixin):
    __tablename__ = "beneficiaries"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    nickname = Column(String(50), nullable=True)
    account_number = Column(String(20), nullable=False)
    ifsc_code = Column(String(11), nullable=True)
    bank_name = Column(String(100), nullable=True)
    beneficiary_name = Column(String(100), nullable=False)
    is_verified = Column(Boolean, default=False)
    daily_limit = Column(Numeric(15, 2), default=Decimal("100000.00"))
