import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.database import get_db
from app.models.leave import LeaveRequest
from app.schemas.leave import LeaveRequestCreate, LeaveRequestRead, LeaveRequestUpdate

router = APIRouter()


@router.get("/", response_model=list[LeaveRequestRead])
async def list_leave_requests(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    employee_id: uuid.UUID | None = Query(None),
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    query = select(LeaveRequest)

    if employee_id:
        query = query.where(LeaveRequest.employee_id == employee_id)
    if status:
        query = query.where(LeaveRequest.status == status)

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.get("/{leave_id}", response_model=LeaveRequestRead)
async def get_leave_request(
    leave_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = await db.execute(select(LeaveRequest).where(LeaveRequest.id == leave_id))
    leave = result.scalar_one_or_none()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return leave


@router.post("/", response_model=LeaveRequestRead, status_code=201)
async def create_leave_request(
    payload: LeaveRequestCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    leave = LeaveRequest(**payload.model_dump())
    db.add(leave)
    await db.commit()
    await db.refresh(leave)
    return leave


@router.patch("/{leave_id}", response_model=LeaveRequestRead)
async def update_leave_request(
    leave_id: uuid.UUID,
    payload: LeaveRequestUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = await db.execute(select(LeaveRequest).where(LeaveRequest.id == leave_id))
    leave = result.scalar_one_or_none()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(leave, field, value)

    await db.commit()
    await db.refresh(leave)
    return leave


@router.delete("/{leave_id}", status_code=204)
async def delete_leave_request(
    leave_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = await db.execute(select(LeaveRequest).where(LeaveRequest.id == leave_id))
    leave = result.scalar_one_or_none()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
    await db.delete(leave)
    await db.commit()
