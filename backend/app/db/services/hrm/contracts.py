from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql


SELECT_FRAGMENT = '''
	SELECT
		c.*,
		t.name 'work_type_name',
		et.name 'employee_type_name',
		CONCAT(e.lastname, ' ', e.firstname) 'manager_name',
		wi.probation_startdate,
		wi.joining_date,
		wi.phone 'work_phone',
		wi.email 'work_email',
		d.name 'department_name',
		p.name 'position_name',
		
		(
			SELECT COUNT(id)
			FROM api_employee_family f
			WHERE f.family_employee_id = c.employee_id
			AND f.is_dependent = 1
		) 'dependent_count',

		CASE
			WHEN c.start_date = (
				SELECT MAX(cx.start_date)
				FROM api_contract cx
				WHERE cx.employee_id = c.employee_id
			) THEN TRUE
			ELSE NULL
		END 'is_latest'

	FROM
		api_contract c
		LEFT JOIN api_work_type t ON t.id = c.work_type_id
		LEFT JOIN api_employee_type et ON et.id = c.employee_type_id
		LEFT JOIN api_employee e ON e.id = c.manager_employee_id
		LEFT JOIN api_work_information wi ON wi.work_info_employee_id = c.employee_id
		LEFT JOIN api_department d ON d.id = wi.department_id
		LEFT JOIN api_position p ON p.id = wi.position_id
'''

# - - - - -
async def get_contracts(db: AsyncSession, employee_id: int):
	query = text(
		f'''
		{SELECT_FRAGMENT}
		WHERE
			c.employee_id = :employee_id
		ORDER BY
			c.start_date DESC
		'''
	)

	result = await db.execute(query, params={'employee_id': employee_id})
	return [dict(row) for row in result.mappings()]

# - - - - -
async def get_latest_contract(db: AsyncSession, employee_id: int):
	sql = text(
		'''
			SELECT
				*
			FROM api_contract
			WHERE
				employee_id = :employee_id
			ORDER BY
				start_date DESC
			LIMIT 1
		'''
	)

	result = await db.execute(sql, params={'employee_id': employee_id})
	row = result.mappings().first()
	return dict(row) if row else None