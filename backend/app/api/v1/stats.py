from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.models.department import Department
from app.models.employee import Employee
from app.models.leave import LeaveRequest

router = APIRouter()


@router.get("/")
async def get_stats(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    employees = await db.execute(select(func.count()).select_from(Employee))
    departments = await db.execute(select(func.count()).select_from(Department))
    pending = await db.execute(
        select(func.count()).select_from(LeaveRequest).where(LeaveRequest.status == "pending")
    )
    today = await db.execute(
        select(func.count())
        .select_from(AttendanceRecord)
        .where(AttendanceRecord.date == date.today())
    )

    return {
        "total_employees": employees.scalar_one(),
        "total_departments": departments.scalar_one(),
        "pending_leaves": pending.scalar_one(),
        "today_attendance": today.scalar_one(),
    }
