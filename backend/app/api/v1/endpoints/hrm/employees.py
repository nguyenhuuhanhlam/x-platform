from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.api import handle_exceptions
from app.db.session import get_db
from app.db.services.hrm.employees import get_employees

# - - - - -
router = APIRouter(prefix='/hrm', tags=['HRM-Employees'])
# - - - - -

@router.get('/employees/is-active')
async def get__employees(db: AsyncSession = Depends(get_db)):
	return await handle_exceptions(get_employees, db, is_leaving=0)