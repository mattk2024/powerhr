import uuid
from datetime import date, datetime

from pydantic import BaseModel


class LeaveRequestBase(BaseModel):
    leave_type: str
    start_date: date
    end_date: date
    reason: str | None = None


class LeaveRequestCreate(LeaveRequestBase):
    employee_id: uuid.UUID


class LeaveRequestUpdate(BaseModel):
    status: str | None = None
    reason: str | None = None


class LeaveRequestRead(LeaveRequestBase):
    id: uuid.UUID
    employee_id: uuid.UUID
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
