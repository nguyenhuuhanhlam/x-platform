from fastapi import APIRouter

from app.api.v1.endpoints.hrm.employees import router as employees_router
from app.api.v1.endpoints.hrm.personal import router as personal_router
from app.api.v1.endpoints.hrm.families import router as families_router

from app.api.v1.endpoints.cfm.cons import router as cons_spa_router
from app.api.v1.endpoints.cfm.con_projects import router as con_projects_router
from app.api.v1.endpoints.cfm.contacts import router as contacts_router

# from app.api.v1.endpoints.minio.client import router as minio_router

# CFM Routers
cfm_router = APIRouter()
cfm_router.include_router(cons_spa_router)
cfm_router.include_router(con_projects_router)
cfm_router.include_router(contacts_router)

# HRM Routers
hrm_router = APIRouter()
hrm_router.include_router(employees_router)
hrm_router.include_router(personal_router)
hrm_router.include_router(families_router)

# MINIO Routers
# minio_router = APIRouter()
# minio_router.include_router(minio_router)