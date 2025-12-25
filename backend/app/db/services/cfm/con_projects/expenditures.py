from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql


async def get_expenditures(db: AsyncSession, project_id: int):
    query = text('''
		SELECT
			ex.*
		FROM
			cfm_con_expenditures ex
		WHERE
			ex.project_id = :project_id
		ORDER BY ex.payment_received_date
	''')

    result = await db.execute(query, {'project_id': project_id})
    return [dict(row) for row in result.mappings()]


async def post_expenditure(db: AsyncSession, data: dict):
    sql = generate_upsert_sql('cfm_con_expenditures', data, upsert=True)
    payload = build_sql_payload(sql, data)

    await db.execute(text(sql), payload)
    await db.commit()


async def delete_expenditure(db: AsyncSession, expenditure_id: int):
    sql = 'DELETE FROM cfm_con_expenditures WHERE id = :expenditure_id'
    payload = {'expenditure_id': expenditure_id}

    await db.execute(text(sql), payload)
    await db.commit()


async def get_expenditures_summary(db: AsyncSession, project_id: int):
    query = text('''
		SELECT
			SUM(CASE WHEN status='HT' THEN amount ELSE 0 END) 'HT_sum',
            SUM(CASE WHEN status='HT' THEN amount_vat ELSE 0 END) 'HT_sum_vat',
                 
            SUM(CASE WHEN type='NS' THEN amount ELSE 0 END) 'NS_sum',
            SUM(CASE WHEN type='NS' THEN amount_vat ELSE 0 END) 'NS_sum_vat',
                 
            SUM(CASE WHEN type='PS' THEN amount ELSE 0 END) 'PS_sum',
		    SUM(CASE WHEN type='PS' THEN amount_vat ELSE 0 END) 'PS_sum_vat',
                 
            SUM(CASE WHEN type='HH' THEN amount ELSE 0 END) 'HH_sum',
		    SUM(CASE WHEN type='HH' THEN amount_vat ELSE 0 END) 'HH_sum_vat',
                 
            SUM(CASE WHEN type='BH' THEN amount ELSE 0 END) 'BH_sum',
		    SUM(CASE WHEN type='BH' THEN amount_vat ELSE 0 END) 'BH_sum_vat'
		FROM
			cfm_con_expenditures
		WHERE
			project_id = :project_id
	''')

    result = await db.execute(query, {'project_id': project_id})
    return [dict(row) for row in result.mappings()]
