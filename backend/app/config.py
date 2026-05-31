from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="NANDT_",
        extra="ignore",
    )

    app_name: str = "NomandTax"
    debug: bool = False
    database_url: str = Field(
        alias="DATABASE_URL",
        description="PostgreSQL connection string (asyncpg)",
    )
    secret_key: str = Field(
        alias="SECRET_KEY",
        min_length=32,
        description="Key for signing JWT tokens (≥ 32 chars)",
    )
    access_token_expire_minutes: int = 30


settings = Settings()
