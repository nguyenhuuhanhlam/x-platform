from fastapi import APIRouter

from app.api.v1.endpoints.cfm.cons import router as cons_spa_router
from app.api.v1.endpoints.cfm.con_projects import router as con_projects_router
from app.api.v1.endpoints.cfm.contacts import router as contacts_router

# CFM Routers
cfm_router = APIRouter()
cfm_router.include_router(cons_spa_router)
cfm_router.include_router(con_projects_router)
cfm_router.include_router(contacts_router)