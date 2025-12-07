from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.utils import increment_badge_id


# - - - - -
async def get_employees(
		db: AsyncSession,
		is_leaving: int | None = None,
		employee_id: int | None = None):

	query = text(
		'''
			SELECT
				e.id,
				e.badge_id,
				e.lastname,
				e.firstname,
				d.name 'department',
				p.name 'position',
				w.id 'workinfo_id',
				et.name 'employee_type'
			FROM
				api_employee e
				LEFT JOIN api_work_information w ON w.work_info_employee_id=e.id
				LEFT JOIN api_department d ON d.id=w.department_id
				LEFT JOIN api_position p ON p.id=w.position_id
				LEFT JOIN api_employee_type et ON et.id=w.employee_type_id
			WHERE
				(is_leaving IS NULL OR is_leaving = :is_leaving)
				AND (:employee_id IS NULL OR e.id = :employee_id)
			ORDER BY 
				d.name
		'''
	)

	params = {'is_leaving': is_leaving, 'employee_id': employee_id}
	result = await db.execute(query, params=params)
	return [dict(row) for row in result.mappings()]