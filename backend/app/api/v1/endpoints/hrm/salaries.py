from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.salaries import get_pit_deduction

# - - - - -
router = APIRouter(prefix='/hrm/salaries', tags=['HRM-Salaries'])
# - - - - -

@router.get('/pit-deduction/{employee_id}')
async def get__pit_deduction(employee_id: int, db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_pit_deduction, db, employee_id=employee_id)