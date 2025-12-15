from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql

# - - - - -
async def get_incomes(db: AsyncSession, project_id: int):
	query = text('''
		SELECT
			ci.*
		FROM
			cfm_con_incomes ci
		WHERE
			ci.project_id = :project_id
	''')

	result = await db.execute(query, {'project_id': project_id})
	return [dict(row) for row in result.mappings()]

# - - - - -	
async def post_income(db: AsyncSession, data: dict):
	sql = generate_upsert_sql('cfm_con_incomes', data, upsert=True)
	payload = build_sql_payload(sql, data)

	await db.execute(text(sql), payload)
	await db.commit()

	# q = text('SELECT * FROM cfm_con_incomes WHERE id = LAST_INSERT_ID()')
	# result = await db.execute(q)
	# return [dict(row) for row in result.mappings()]