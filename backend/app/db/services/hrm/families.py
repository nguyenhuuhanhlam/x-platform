from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.utils import build_sql_payload


async def get_families(db: AsyncSession, id: int):
	query = text(
		'''
			SELECT
			*
			FROM
			api_employee_family
			WHERE
			family_employee_id = :id
		'''
	)

	result = await db.execute(query, params={'id': id})
	families = [dict(row) for row in result.mappings()]
	return families
