from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import second_get_db
from app.db.services.cfm.spa.cons import get_cons

# - - - - -
router = APIRouter(prefix='/cfm/spa', tags=['CONS-SPA'])
# - - - - -

@router.get('/cons')
async def get__cons(db: AsyncSession = Depends(second_get_db)):
	try:
		return await get_cons(db)
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))