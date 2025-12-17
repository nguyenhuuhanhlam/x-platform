from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.families import get_families

# - - - - -
router = APIRouter(prefix='/hrm/families', tags=['HRM'])
# - - - - -

@router.get('/{id}')
async def get__families(id: int, db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_families, db, id=id)