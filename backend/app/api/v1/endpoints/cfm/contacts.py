from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import second_get_db
from app.db.services.cfm.contacts import get_some_contacts

# - - - - -
router = APIRouter(prefix='/cfm', tags=['CFM'])
# - - - - -

@router.post('/some-contacts')
async def get__some_contacts(ids: list[int], db: AsyncSession = Depends(second_get_db)):
	try:
		return await get_some_contacts(db, ids)
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))