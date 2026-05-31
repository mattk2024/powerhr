import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.schemas.attendance import AttendanceCreate, AttendanceRead

router = APIRouter()


@router.get("/", response_model=list[AttendanceRead])
async def list_attendance(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    employee_id: uuid.UUID | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(AttendanceRecord)

    if employee_id:
        query = query.where(AttendanceRecord.employee_id == employee_id)

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.get("/{record_id}", response_model=AttendanceRead)
async def get_attendance_record(record_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AttendanceRecord).where(AttendanceRecord.id == record_id))
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return record


@router.post("/", response_model=AttendanceRead, status_code=201)
async def create_attendance_record(payload: AttendanceCreate, db: AsyncSession = Depends(get_db)):
    record = AttendanceRecord(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=204)
async def delete_attendance_record(record_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AttendanceRecord).where(AttendanceRecord.id == record_id))
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    await db.delete(record)
    await db.commit()
