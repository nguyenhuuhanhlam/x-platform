from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from decimal import Decimal

from app.db.constants import PIT_RULES, PD, SI, DD


# - - - - -
class PayrollCalculator:

	@staticmethod
	def pit(gross_pay: Decimal, basic_pay: Decimal, dependent_count: int) -> Decimal:
		if gross_pay <= PD:
			return Decimal("0")

		taxable_income = (
			gross_pay
			- PD
			- (basic_pay * SI)
			- (Decimal(dependent_count) * DD)
		)

		taxable_income = max(Decimal("0"), taxable_income)

		for rule in PIT_RULES:
			min_r, max_r = rule["range"]
			if min_r <= taxable_income < max_r:
					return (taxable_income * rule["pct"] - rule["sub"]).quantize(Decimal("1"))

		return Decimal("0")


# - - - - -
async def get_pit_deduction(db: AsyncSession, employee_id: int):
	query = text(
		'''
			SELECT
				e.id 'employee_id',
				con.basic_pay,
				(
					con.basic_pay +
					con.position_pay +
					con.management_allowance +
					con.additional_allowance +
					con.field_allowance +
					con.phone_allowance
				) 'gross_pay',
				COALESCE(f.dependent_count, 0) 'dependent_count'
			FROM
				api_employee e

				LEFT JOIN (
					SELECT
						*,
						ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY start_date DESC) rn
					FROM api_contract
				) con ON con.employee_id = e.id

				LEFT JOIN (
					SELECT
						family_employee_id,
						SUM(IF(is_dependent = 1, 1, 0)) 'dependent_count'
					FROM
						api_employee_family 
						GROUP BY family_employee_id
				) f ON f.family_employee_id = e.id

			WHERE rn = 1 AND e.id = :employee_id
		'''
	)

	result = await db.execute(query, params={'employee_id': employee_id})
	row = result.mappings().first()

	if not row:
		return None

	pit = PayrollCalculator.pit(
		gross_pay=row["gross_pay"],
		basic_pay=row["basic_pay"],
		dependent_count=row["dependent_count"]
	)

	return {
		"employee_id": row["employee_id"],
		"gross_pay": int(row["gross_pay"]),
		"basic_pay": int(row["basic_pay"]),
		"dependent_count": row["dependent_count"],
		"pit": int(pit)
	}