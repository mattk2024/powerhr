import uuid
from datetime import date, datetime

from pydantic import BaseModel, EmailStr


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    position: str
    department_id: uuid.UUID | None = None
    status: str = "active"


class EmployeeCreate(EmployeeBase):
    hire_date: date


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    position: str | None = None
    department_id: uuid.UUID | None = None
    status: str | None = None


class EmployeeRead(EmployeeBase):
    id: uuid.UUID
    hire_date: date
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
