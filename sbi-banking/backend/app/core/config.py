from pydantic_settings import BaseSettings
from typing import List
import json
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "SBI Online Banking"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://sbi_user:sbi_secure_pass@localhost:5432/sbi_banking"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # JWT
    SECRET_KEY: str = "change-this-secret-key-in-production-32-chars-min"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # OTP
    OTP_EXPIRE_MINUTES: int = 5
    OTP_LENGTH: int = 6

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    # Admin defaults
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "Admin@SBI123"
    ADMIN_EMAIL: str = "admin@sbi.co.in"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        raw = os.getenv("CORS_ORIGINS")
        if raw:
            try:
                self.CORS_ORIGINS = json.loads(raw)
            except Exception:
                self.CORS_ORIGINS = [raw]


settings = Settings()
