from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import build_sql_payload, generate_upsert_sql


async def get_incomes(db: AsyncSession, project_id: int):
    query = text('''
		SELECT
			ci.*
		FROM
			cfm_con_incomes ci
		WHERE
			ci.project_id = :project_id
		ORDER BY
			ci.payment_received_date
	''')

    result = await db.execute(query, {'project_id': project_id})
    return [dict(row) for row in result.mappings()]


async def post_income(db: AsyncSession, data: dict):
    sql = generate_upsert_sql('cfm_con_incomes', data, upsert=True)
    payload = build_sql_payload(sql, data)

    await db.execute(text(sql), payload)
    await db.commit()


async def delete_income(db: AsyncSession, income_id: int):
    sql = 'DELETE FROM cfm_con_incomes WHERE id = :income_id'
    payload = {'income_id': income_id}

    await db.execute(text(sql), payload)
    await db.commit()


async def get_incomes_summary(db: AsyncSession, project_id: int):
    query = text('''
		SELECT
            SUM(CASE WHEN status='KH' THEN amount ELSE 0 END) 'KH_sum',
	        SUM(CASE WHEN status='KH' THEN amount_vat ELSE 0 END) 'KH_sum_vat',
            SUM(CASE WHEN status='KH' AND type='BH' THEN amount ELSE 0 END) 'KH_BH_sum',
            SUM(CASE WHEN status='KH' AND type='BH' THEN amount_vat ELSE 0 END) 'KH_BH_sum_vat',
            SUM(CASE WHEN status='HT' THEN amount ELSE 0 END) 'HT_sum',
            SUM(CASE WHEN status='HT' THEN amount_vat ELSE 0 END) 'HT_sum_vat'
		FROM
            cfm_con_incomes
        WHERE
            project_id = :project_id
    ''')

    result = await db.execute(query, {'project_id': project_id})
    return [dict(row) for row in result.mappings()]
