import uuid
from datetime import date, datetime

from pydantic import BaseModel


class AttendanceBase(BaseModel):
    date: date
    check_in: datetime | None = None
    check_out: datetime | None = None
    status: str = "present"
    notes: str | None = None


class AttendanceCreate(AttendanceBase):
    employee_id: uuid.UUID


class AttendanceRead(AttendanceBase):
    id: uuid.UUID
    employee_id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}
