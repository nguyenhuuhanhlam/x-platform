	import { z } from 'zod'

	export const formSchema = z.object({
		project: z.string().min(1),

		sales_objects: z.string().min(1),
		funding_source: z.string().min(1),

		contract_name: z.string().min(1),
		contract_code: z.string().min(1),
		contract_status: z.string().min(1),

		signed_date: z.string().min(1),
		expiry_date: z.string().min(1),
		effective_days: z.string().min(1),

		contract_value_vat: z.string().min(1),
		total_original_vat: z.string().min(1),
		sales_cost: z.string().min(1),
		total_planned_vat: z.string().min(1),
	})