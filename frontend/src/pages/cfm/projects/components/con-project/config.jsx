import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { IconCircleFilled } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { INCOME_TYPES, INCOME_STATUS } from '@/constants'

export const styles = {
	container: 'flex flex-col sm:flex-row gap-4 pb-8 w-full sm:w-[1444px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4'
}

export const con_columns = (t) => [
	{ accessorKey: 'project_name', header: t('project'), },
	{ accessorKey: 'company_name', header: t('company'), },
]

export const income_columns = (t) => [
	{ accessorKey: 'title', header: t('income.title') },
	{
		accessorKey: 'type', header: t('income.type'),
		cell: ({ row }) => {
			if (row.getValue('type').length < 2) return '-'

			return (
				<Badge variant="outline" size="sm">
					<IconCircleFilled className={cn("w-2! h-2!", INCOME_TYPES[row.getValue('type')]?.tagClass)} />
					{INCOME_TYPES[row.getValue('type')]?.text}
				</Badge>
			)
		}
	},
	{ accessorKey: 'amount', header: t('amount'), },
	{ accessorKey: 'payment_received_date', header: t('income.payment_received_date'), },
	{
		accessorKey: 'status', header: t('status'),
		cell: ({ row }) => {
			if (row.getValue('status').length < 2) return '-'

			return (
				<Badge variant="outline" size="sm">
					<IconCircleFilled className={cn("w-2! h-2!", INCOME_STATUS[row.getValue('status')]?.tagClass)} />
					{INCOME_STATUS[row.getValue('status')]?.text}
				</Badge>
			)
		}
	},
]

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