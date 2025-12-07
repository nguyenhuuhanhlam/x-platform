from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.personal import get_personal


# - - - - -
router = APIRouter(prefix='/hrm/personal', tags=['HRM-Personal'])
# - - - - -

@router.get('/{id}')
async def get__personal(id: int, db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_personal, db, id=id)