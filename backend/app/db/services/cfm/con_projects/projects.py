from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from app.db.utils import ( build_sql_payload, generate_upsert_sql, parse_iso_date )


# - - - - -	
async def get_projects(db: AsyncSession):
	query = text(
		'''
			SELECT
				p.*,
				c.CompanyName 'company_name',
				c.Id 'company_id',
				d.stageText 'stage_text',				
				CONCAT(u.LastName, ' ', u.UserName) 'responsible_name'
			FROM
				cfm_con_projects p
			LEFT JOIN companies c ON c.Id = p.company_id
			LEFT JOIN stages_definitions d ON d.stageValue = p.stage
			LEFT JOIN users u ON u.Id = p.responsible_id
		'''
	)

	result = await db.execute(query)
	return [dict(row) for row in result.mappings()]


# - - - - -	
async def get_project_details(db: AsyncSession, project_id: int):
	query = text(
		'''
			SELECT
				p.*,
				c.CompanyName 'company_name',
				d.stageText 'stage_text',
				d.color 'stage_color',
				CONCAT(u.LastName, ' ', u.UserName) 'responsible',
				spa.ContactIds 'contact_ids',
				spa.HandoverDeadline 'handover_deadline',
				spa.ImportantNotes 'important_notes',
				spa.CustomerCommitments 'customer_commitments',
				spa.AcceptanceConditions 'acceptance_conditions',
				spa.WarrantyExpirationDate 'warranty_expiration_date',
				CONCAT(up.LastName, ' ', up.UserName) 'participant'
			FROM
				cfm_con_projects p
			LEFT JOIN spa_131_15 spa ON spa.Id = p.project_id
			LEFT JOIN companies c ON c.Id = p.company_id
			LEFT JOIN stages_definitions d ON d.stageValue = p.stage
			LEFT JOIN users u ON u.Id = p.responsible_id
			LEFT JOIN users up ON up.Id = spa.Participant
			WHERE p.project_id = :project_id
			LIMIT 1
		'''
	)

	result = await db.execute(query, params={'project_id': project_id})
	return [dict(row) for row in result.mappings()]


# - - - - -		
async def create_project(db: AsyncSession, data: dict):
	data['project_id'] = data['project']['value']
	data['project_name'] = data['project']['label']
	data['signed_date'] = parse_iso_date(data['signed_date']).strftime('%Y-%m-%d')
	data['expiry_date'] = parse_iso_date(data['expiry_date']).strftime('%Y-%m-%d')
	data['company_id'] = data['company']['value']
	data['responsible_id'] = data['responsible']['value']
	data['stage'] = data['stage']['value']

	del data['project']
	del data['company']
	del data['responsible']

	sql = generate_upsert_sql('cfm_con_projects', data)
	payload = build_sql_payload(sql, data)

	await db.execute(text(sql), payload)
	await db.commit()

	q = text('SELECT * FROM cfm_con_projects WHERE id = LAST_INSERT_ID()')
	result = await db.execute(q)
	return [dict(row) for row in result.mappings()]


# - - - - -	
async def update_project(db: AsyncSession, project_id: int, data: dict):
	data['id'] = project_id
	data['project_name'] = data['project']['label']
	data['signed_date'] = parse_iso_date(data['signed_date']).strftime('%Y-%m-%d')
	data['expiry_date'] = parse_iso_date(data['expiry_date']).strftime('%Y-%m-%d')
	data['company_id'] = data['company']['value']
	data['responsible_id'] = data['responsible']['value']
	data['stage'] = data['stage']['value']

	del data['project']
	del data['company']
	del data['responsible']

	sql = generate_upsert_sql('cfm_con_projects', data, upsert=True)
	payload = build_sql_payload(sql, data)

	try:
		result = await db.execute(text(sql), payload)
		await db.commit()
		return []
		
	except SQLAlchemyError as e:
		await db.rollback()
		print('Error updating CFM Project:', e)
		return None