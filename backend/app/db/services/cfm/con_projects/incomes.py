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
		ORDER BY ci.payment_received_date
	''')

	result = await db.execute(query, {'project_id': project_id})
	return [dict(row) for row in result.mappings()]

# - - - - -	
async def post_income(db: AsyncSession, data: dict):
	sql = generate_upsert_sql('cfm_con_incomes', data, upsert=True)
	payload = build_sql_payload(sql, data)

	await db.execute(text(sql), payload)
	await db.commit()

# - - - - -	
async def delete_income(db: AsyncSession, income_id: int):
	sql = 'DELETE FROM cfm_con_incomes WHERE id = :income_id'
	payload = {'income_id': income_id}

	await db.execute(text(sql), payload)
	await db.commit()