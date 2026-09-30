from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.session import get_db
from app.models.models import User, UserRole, UserStatus, AuditLog

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    payload = decode_token(token)

    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == payload["sub"]).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    if user.status != UserStatus.ACTIVE:
        raise HTTPException(status_code=403, detail="Account is not active")

    return user


def get_current_admin(user: User = Depends(get_current_user)) -> User:
    if user.role not in (UserRole.ADMIN, UserRole.MANAGER):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


def get_current_super_admin(user: User = Depends(get_current_user)) -> User:
    """Only users with role=ADMIN. Managers are rejected."""
    if user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Super admin access required")
    return user


def write_audit_log(
    db,
    admin: User,
    action: str,
    resource: str,
    resource_id: str,
    ip_address: str = None,
    details: str = None,
    log_status: str = "success",
):
    """Insert an audit-log row. Caller is responsible for db.commit()."""
    log = AuditLog(
        user_id=admin.id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        ip_address=ip_address,
        details=details,
        status=log_status,
    )
    db.add(log)
