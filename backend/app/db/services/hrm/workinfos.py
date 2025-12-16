from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.db.utils import build_sql_payload, generate_upsert_sql


# - - - - -
async def get_workinfos_by_employee(db: AsyncSession, employee_id: int):
	try:
		sql = '''
			SELECT
				wi.*,
				d.name 'department_name',
				p.name 'position_name',
				t.name 'employee_type_name',
				w.name 'work_type_name',
				CONCAT(e.lastname , ' ' , e.firstname) 'manager_name'
			FROM api_work_information wi
				JOIN api_department d ON d.id = wi.department_id
				JOIN api_position p ON p.id = wi.position_id
				JOIN api_employee_type t ON t.id = wi.employee_type_id
				JOIN api_work_type w ON w.id = wi.work_type_id
				JOIN api_employee e ON e.id = wi.manager_employee_id
			WHERE work_info_employee_id = :employee_id
		'''
		payload = {'employee_id': employee_id}

		result = await db.execute(text(sql), payload)
		row = result.mappings().first()

		return row if row else None
		
	except SQLAlchemyError as e:
		return {'error': e}