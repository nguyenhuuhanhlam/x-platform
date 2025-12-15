import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Check, X } from "lucide-react"
import { EditableCell, DateCell, OptionCell } from '@/components/ui-x/custom-cells'

export const styles = {
	container: 'flex flex-col sm:flex-row gap-4 pb-8 w-full sm:w-[1444px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4'
}

export const con_columns = (t) => [
	{ accessorKey: 'project_name', header: t('project'), },
	{ accessorKey: 'company_name', header: t('company'), },
]

export const income_columns = (t) => [
	{ accessorKey: 'title', header: t('income.title'), cell: EditableCell },
	{ accessorKey: 'type', header: t('income.type'), },
	{ accessorKey: 'amount', header: t('amount'), },
	{ accessorKey: 'payment_received_date', header: t('income.payment_received_date'), },
	{ accessorKey: 'status', header: t('status'), },

	{
		id: 'action', header: t('action'),
		cell: ({ row, table }) => {
			const meta = table.options.meta
			const isEditing = meta?.editingRowId === row.id

			const onEdit = () => meta?.onStartEdit(row.original) //meta?.setEditingRowId(row.id)
			const onSave = () => meta?.onSaveRow(row.original)
			const onCancel = () => meta?.onCancelEdit()

			return (
				<div className="flex items-center gap-2">
					{isEditing ? (
						<>
							<Button
								onClick={onSave}
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
								title="Save"
							>
								<Check className="h-4 w-4" />
							</Button>

							<Button
								onClick={onCancel}
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
								title="Cancel"
							>
								<X className="h-4 w-4" />
							</Button>
						</>
					) : (
						<Button
							onClick={onEdit}
							variant="ghost"
							size="icon"
							className="h-8 w-8 hover:bg-slate-200"
							title="Edit"
						>
							<Pencil className="h-3.5 w-3.5" />
						</Button>
					)}
				</div>
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