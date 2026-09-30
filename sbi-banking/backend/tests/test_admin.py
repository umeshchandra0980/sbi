"""
Tests for admin portal security rules:
1. Customer gets 403 on admin routes
2. Manager cannot touch admin/manager users
3. Manager cannot change roles
4. Admin cannot lock self
5. Audit rows are created for admin actions
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.models.models import User, UserRole, UserStatus, AuditLog
from app.core.security import hash_password, create_access_token

# ── In-memory SQLite test DB ────────────────────────────────
TEST_DATABASE_URL = "sqlite:///./test_admin.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestSession()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_db():
    """Create tables before each test, drop after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def _create_user(role: UserRole, username: str, user_id: str = None) -> User:
    """Insert a user into the test DB and return it."""
    db = TestSession()
    user = User(
        id=user_id or username,
        username=username,
        email=f"{username}@test.com",
        phone=f"9{username[:9].ljust(9, '0')}",
        full_name=f"Test {username}",
        hashed_password=hash_password("Test@1234"),
        role=role,
        status=UserStatus.ACTIVE,
        is_verified=True,
    )
    db.add(user)
    db.commit()
    db.close()
    return user


def _token_for(user: User) -> dict:
    """Create an auth header dict for the given user."""
    token = create_access_token(user.id, {"role": user.role.value})
    return {"Authorization": f"Bearer {token}"}


client = TestClient(app)


# ─────────────────────────────────────────────────────────────
# 1. Customer gets 403 on admin routes
# ─────────────────────────────────────────────────────────────
class TestCustomerBlocked:
    def test_customer_cannot_access_stats(self):
        customer = _create_user(UserRole.CUSTOMER, "cust1")
        r = client.get("/api/v1/admin/stats", headers=_token_for(customer))
        assert r.status_code == 403

    def test_customer_cannot_list_users(self):
        customer = _create_user(UserRole.CUSTOMER, "cust2")
        r = client.get("/api/v1/admin/users", headers=_token_for(customer))
        assert r.status_code == 403

    def test_customer_cannot_list_audit_logs(self):
        customer = _create_user(UserRole.CUSTOMER, "cust3")
        r = client.get("/api/v1/admin/audit-logs", headers=_token_for(customer))
        assert r.status_code == 403


# ─────────────────────────────────────────────────────────────
# 2. Manager cannot touch admin/manager users
# ─────────────────────────────────────────────────────────────
class TestManagerCannotTouchStaff:
    def test_manager_cannot_lock_admin(self):
        manager = _create_user(UserRole.MANAGER, "mgr1")
        admin = _create_user(UserRole.ADMIN, "adm1")
        r = client.patch(
            f"/api/v1/admin/users/{admin.id}/lock",
            headers=_token_for(manager),
        )
        assert r.status_code == 403

    def test_manager_cannot_suspend_manager(self):
        manager1 = _create_user(UserRole.MANAGER, "mgr2")
        manager2 = _create_user(UserRole.MANAGER, "mgr3", user_id="mgr3_id")
        r = client.patch(
            f"/api/v1/admin/users/{manager2.id}/suspend",
            headers=_token_for(manager1),
        )
        assert r.status_code == 403

    def test_manager_cannot_edit_admin(self):
        manager = _create_user(UserRole.MANAGER, "mgr4")
        admin = _create_user(UserRole.ADMIN, "adm2")
        r = client.patch(
            f"/api/v1/admin/users/{admin.id}",
            headers=_token_for(manager),
            json={"full_name": "Hacked"},
        )
        assert r.status_code == 403

    def test_manager_can_lock_customer(self):
        manager = _create_user(UserRole.MANAGER, "mgr5")
        customer = _create_user(UserRole.CUSTOMER, "cust4")
        r = client.patch(
            f"/api/v1/admin/users/{customer.id}/lock",
            headers=_token_for(manager),
        )
        assert r.status_code == 200


# ─────────────────────────────────────────────────────────────
# 3. Manager cannot change roles
# ─────────────────────────────────────────────────────────────
class TestManagerCannotChangeRoles:
    def test_manager_cannot_change_role(self):
        manager = _create_user(UserRole.MANAGER, "mgr6")
        customer = _create_user(UserRole.CUSTOMER, "cust5")
        r = client.patch(
            f"/api/v1/admin/users/{customer.id}/role",
            headers=_token_for(manager),
            json={"role": "admin"},
        )
        # Manager should get 403 from get_current_super_admin
        assert r.status_code == 403

    def test_manager_cannot_reset_password(self):
        manager = _create_user(UserRole.MANAGER, "mgr7")
        customer = _create_user(UserRole.CUSTOMER, "cust6")
        r = client.post(
            f"/api/v1/admin/users/{customer.id}/reset-password",
            headers=_token_for(manager),
        )
        assert r.status_code == 403


# ─────────────────────────────────────────────────────────────
# 4. Admin cannot lock self
# ─────────────────────────────────────────────────────────────
class TestAdminCannotSelfAction:
    def test_admin_cannot_lock_self(self):
        admin = _create_user(UserRole.ADMIN, "adm3")
        r = client.patch(
            f"/api/v1/admin/users/{admin.id}/lock",
            headers=_token_for(admin),
        )
        assert r.status_code == 400
        assert "your own account" in r.json()["detail"].lower()

    def test_admin_cannot_suspend_self(self):
        admin = _create_user(UserRole.ADMIN, "adm4")
        r = client.patch(
            f"/api/v1/admin/users/{admin.id}/suspend",
            headers=_token_for(admin),
        )
        assert r.status_code == 400

    def test_admin_cannot_reset_own_password(self):
        admin = _create_user(UserRole.ADMIN, "adm5")
        r = client.post(
            f"/api/v1/admin/users/{admin.id}/reset-password",
            headers=_token_for(admin),
        )
        assert r.status_code == 400


# ─────────────────────────────────────────────────────────────
# 5. Audit rows are created
# ─────────────────────────────────────────────────────────────
class TestAuditLogsCreated:
    def test_lock_creates_audit_log(self):
        admin = _create_user(UserRole.ADMIN, "adm6")
        customer = _create_user(UserRole.CUSTOMER, "cust7")
        r = client.patch(
            f"/api/v1/admin/users/{customer.id}/lock",
            headers=_token_for(admin),
        )
        assert r.status_code == 200

        db = TestSession()
        log = db.query(AuditLog).filter(AuditLog.action == "lock_user").first()
        assert log is not None
        assert log.user_id == admin.id
        assert log.resource_id == customer.id
        db.close()

    def test_create_user_creates_audit_log(self):
        admin = _create_user(UserRole.ADMIN, "adm7")
        r = client.post(
            "/api/v1/admin/users",
            headers=_token_for(admin),
            json={
                "username": "newuser",
                "email": "newuser@test.com",
                "full_name": "New User",
                "password": "NewUser@123",
                "role": "customer",
            },
        )
        assert r.status_code == 200

        db = TestSession()
        log = db.query(AuditLog).filter(AuditLog.action == "create_user").first()
        assert log is not None
        assert log.user_id == admin.id
        db.close()

    def test_role_change_creates_audit_log(self):
        admin = _create_user(UserRole.ADMIN, "adm8")
        customer = _create_user(UserRole.CUSTOMER, "cust8")
        r = client.patch(
            f"/api/v1/admin/users/{customer.id}/role",
            headers=_token_for(admin),
            json={"role": "manager"},
        )
        assert r.status_code == 200

        db = TestSession()
        log = db.query(AuditLog).filter(AuditLog.action == "change_role").first()
        assert log is not None
        assert "customer" in (log.details or "").lower()
        assert "manager" in (log.details or "").lower()
        db.close()
