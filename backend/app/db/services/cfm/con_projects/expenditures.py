from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql

# - - - - -
async def get_expenditures(db: AsyncSession, project_id: int):
	query = text('''
		SELECT
			ex.*
		FROM
			cfm_con_expenditures ex
		WHERE
			ex.project_id = :project_id
	''')

	result = await db.execute(query, {'project_id': project_id})
	return [dict(row) for row in result.mappings()]

# - - - - -	
async def post_expenditure(db: AsyncSession, data: dict):
	sql = generate_upsert_sql('cfm_con_expenditures', data, upsert=True)
	payload = build_sql_payload(sql, data)

	await db.execute(text(sql), payload)
	await db.commit()

# - - - - -	
async def delete_expenditure(db: AsyncSession, expenditure_id: int):
	sql = 'DELETE FROM cfm_con_expenditures WHERE id = :expenditure_id'
	payload = {'expenditure_id': expenditure_id}

	await db.execute(text(sql), payload)
	await db.commit()