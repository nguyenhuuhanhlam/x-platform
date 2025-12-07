from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql


# - - - - -
async def get_personal(db: AsyncSession, id: int):
    query = text(
        '''
		SELECT
			e.*,
			p.name 'province_name'
		FROM
			api_employee e
			LEFT JOIN api_province p ON p.id = e.province_id
		WHERE
			e.id = :id
	'''
    )

    result = await db.execute(query, params={'id': id})
    return [dict(row) for row in result.mappings()]