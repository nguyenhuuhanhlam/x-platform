from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

# - - - - -
# d.stageValue !required

async def get_cons(db: AsyncSession):
	query = text(
		'''
			SELECT
				s.Id,
				s.Title,
				s.CompanyId,
				s.StageDeadline,
				s.AssignedById 'responsible_id',
				m.CompanyName,
				CONCAT(u.LastName, ' ', u.UserName) 'responsible',
				d.stageText,
				d.stageValue
			FROM
				spa_131_15 s
			LEFT JOIN cfm_con_projects p ON p.project_id = s.Id
			LEFT JOIN companies m ON m.Id = s.CompanyId
			LEFT JOIN users u ON u.Id = s.AssignedById
			LEFT JOIN stages_definitions d ON d.stageValue = s.StageId
			WHERE p.project_id IS NULL
		'''
	)

	result = await db.execute(query)
	return [dict(row) for row in result.mappings()]