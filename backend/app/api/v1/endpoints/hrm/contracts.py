from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db

from app.db.services.hrm.contracts import get_contracts

# - - - - -
router = APIRouter(prefix='/hrm/contracts', tags=['HRM'])
# - - - - -


@router.get('/{employee_id}')
async def get__contracts(employee_id: int, db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_contracts, db, employee_id=employee_id)
