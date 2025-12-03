from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text


# - - - - -	
async def get_some_contacts(db: AsyncSession, ids: list[int]):
	if not ids:
		return []

	placeholders = ', '.join([f':id{i}' for i in range(len(ids))])

	q = text(f'''
		SELECT
			Id 'contact_id',
			CONCAT(lastname, ' ', name) 'contact_name',
			Post 'position',
			Phones 'phones',
			Emails 'emails'
		FROM
			contacts
		WHERE Id IN ({placeholders})
	''')

	params = {f'id{i}': v for i, v in enumerate(ids)}
	
	result = await db.execute(q, params)
	return [dict(row) for row in result.mappings()]
