from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.utils import build_sql_payload

async def get_provinces(db: AsyncSession):
	query = text(
		'''
		SELECT * FROM api_province
		'''
	)

	result = await db.execute(query, params={'id': id})
	provinces = [dict(row) for row in result.mappings()]
	return provinces