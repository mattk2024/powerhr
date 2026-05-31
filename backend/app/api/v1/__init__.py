from fastapi import APIRouter

from app.api.v1.attendance import router as attendance_router
from app.api.v1.auth import router as auth_router
from app.api.v1.departments import router as departments_router
from app.api.v1.employees import router as employees_router
from app.api.v1.leaves import router as leaves_router

router = APIRouter()
router.include_router(employees_router, prefix="/employees", tags=["Employees"])
router.include_router(departments_router, prefix="/departments", tags=["Departments"])
router.include_router(leaves_router, prefix="/leaves", tags=["Leave Requests"])
router.include_router(attendance_router, prefix="/attendance", tags=["Attendance"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
