import { z } from 'zod'
import dayjs from 'dayjs'
import { Badge } from '@/components/ui/badge'
import { IconCircleFilled } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { fmt_date } from '@/lib/helpers'
import { INCOME_TYPES, INCOME_STATUS, EXPENDITURE_TYPES } from '@/constants'

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
	{
		accessorKey: 'amount', header: t('amount'),
		cell: ({ row }) => (<div className="text-right">{Number(row.getValue('amount')).toLocaleString('de-DE')}</div>)
	},
	{
		accessorKey: 'amount_vat', header: <><span>{t('amount')}</span> <span className="text-[8pt]! text-violet-500">VAT</span></>,
		cell: ({ row }) => (<div className="text-right">{Number(row.getValue('amount_vat')).toLocaleString('de-DE')}</div>)
	},
	{
		accessorKey: 'payment_received_date', header: t('income.payment_received_date'),
		cell: ({ row }) => fmt_date(row.getValue('payment_received_date'))
	},
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

// expenditure_columns --> clone income_columns
export const expenditure_columns = (t) =>
	income_columns(t).map(col => {
		if (col.accessorKey !== 'type') return col

		// override cột type
		return {
			...col,
			header: t('expenditure.type'),
			cell: ({ row }) => {
				const value = row.getValue('type')
				if (!value || value.length < 2) return '-'

				return (
					<Badge variant="outline" size="sm">
						<IconCircleFilled
							className={cn("w-2! h-2!", EXPENDITURE_TYPES[value]?.tagClass)}
						/>
						{EXPENDITURE_TYPES[value]?.text}
					</Badge>
				)
			}
		}
	})

export const form_schema = z.object({
	project_id: z.string().min(1),

	sales_objects: z.string().min(1),
	funding_source: z.string().min(1),

	contract_name: z.string().min(1),
	contract_code: z.string().min(1),
	contract_status: z.string().min(1),

	signed_date: z.string().min(1),
	effective_days: z.number(),
	expiry_date: z.string().min(1),

	contract_value: z.number(),
	total_original: z.number(),
	total_planned: z.number(),

	contract_value_vat: z.number(),
	total_original_vat: z.number(),
	total_planned_vat: z.number(),

	sales_cost: z.number(),
})