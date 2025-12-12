import { z } from 'zod'

export const formSchema = z.object({
	project_id: z.string().min(1),

	sales_objects: z.string().min(1),
	funding_source: z.string().min(1),

	contract_name: z.string().min(1),
	contract_code: z.string().min(1),
	contract_status: z.string().min(1),

	signed_date: z.string().min(1),
	effective_days: z.number(),
	expiry_date: z.string().min(1),

	contract_value_vat: z.number(),
	total_original_vat: z.number(),
	sales_cost: z.number(),
	total_planned_vat: z.number(),
})