from app.db.utils import build_sql_payload, generate_upsert_sql
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError


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


async def insert_personal(db: AsyncSession, data: dict):
    sql = generate_upsert_sql('api_employee', data, upsert=True)
    payload = build_sql_payload(sql, data)
    