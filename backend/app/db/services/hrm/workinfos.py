from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.db.utils import build_sql_payload, generate_upsert_sql


# - - - - -
async def get_workinfos_by_employee(db: AsyncSession, employee_id: int):
	try:
		sql = '''
			SELECT * FROM api_work_information
			WHERE work_info_employee_id = :employee_id
		'''
		payload = {'employee_id': employee_id}

		result = await db.execute(text(sql), payload)
		row = result.mappings().first()

		return row if row else None
		
	except SQLAlchemyError as e:
		return {'error': e}