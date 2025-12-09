from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.workinfos import get_workinfos_by_employee


# - - - - -
router = APIRouter(prefix='/hrm/workinfos', tags=['HRM-WorkInfos'])
# - - - - -

@router.get('/by-employee/{employee_id}')
async def get__workinfos_by_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_workinfos_by_employee, db, employee_id=employee_id)