from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.utils import build_sql_payload


async def get_families(db: AsyncSession, id: int):
	query = text(
		r'''
			SELECT
				id,
				lastname,
				firstname,
				relationship,
				dob,
				is_dependent,
				is_emergency,
				gender,
				IF(CHAR_LENGTH(phone)<3, '-', REGEXP_REPLACE(phone, '^([0-9]{4})([0-9]{3})([0-9]{3})$', '\\1 \\2 \\3')) 'phone',
				family_employee_id
			FROM
				api_employee_family
			WHERE
				family_employee_id = :id
		'''
	)

	result = await db.execute(query, params={'id': id})
	families = [dict(row) for row in result.mappings()]
	return families
