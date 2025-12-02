from fastapi import APIRouter

from app.api.v1.endpoints.cfm.cons import router as cons_spa_router

cfm_router = APIRouter()
cfm_router.include_router(cons_spa_router)