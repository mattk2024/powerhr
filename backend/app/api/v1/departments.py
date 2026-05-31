import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.department import Department
from app.schemas.department import DepartmentCreate, DepartmentRead, DepartmentUpdate

router = APIRouter()


@router.get("/", response_model=list[DepartmentRead])
async def list_departments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Department).offset(skip).limit(limit))
    return result.scalars().all()


@router.get("/{department_id}", response_model=DepartmentRead)
async def get_department(department_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Department).where(Department.id == department_id))
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return department


@router.post("/", response_model=DepartmentRead, status_code=201)
async def create_department(payload: DepartmentCreate, db: AsyncSession = Depends(get_db)):
    department = Department(**payload.model_dump())
    db.add(department)
    await db.commit()
    await db.refresh(department)
    return department


@router.patch("/{department_id}", response_model=DepartmentRead)
async def update_department(
    department_id: uuid.UUID, payload: DepartmentUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Department).where(Department.id == department_id))
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(department, field, value)

    await db.commit()
    await db.refresh(department)
    return department


@router.delete("/{department_id}", status_code=204)
async def delete_department(department_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Department).where(Department.id == department_id))
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    await db.delete(department)
    await db.commit()
