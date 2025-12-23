from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.provinces import get_provinces

# - - - - -
router = APIRouter(prefix='/hrm/provinces', tags=['HRM'])
# - - - - -

@router.get('/')
async def get__provinces(db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_provinces, db)