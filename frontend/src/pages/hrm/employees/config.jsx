import { Badge } from '@/components/ui/badge'
import { IconCircleCheckFilled } from '@tabler/icons-react'

export const employee_columns = (t) => [
	{
		accessorKey: "fullname",
		header: t('fullname'),
		accessorFn: (row) => `${row.lastname} ${row.firstname}`,
		cell: ({ row }) => {
			return <span>{row.getValue('fullname')}</span>
		}
	},
	{ accessorKey: 'department', header: t('department'), },
	{ accessorKey: 'position', header: t('position'), },
	{ accessorKey: 'employee_type', header: t('type') }
]

export const family_columns = (t) => [
	{
		accessorKey: "fullname",
		header: t('fullname'),
		accessorFn: (row) => `${row.lastname} ${row.firstname}`,
		cell: ({ row }) => {
			return <span>{row.getValue('fullname')}</span>
		}
	},
	{
		accessorKey: 'relationship', header: t('relationship'),
		cell: ({ row }) => {
			return row.original['is_dependent']
				? <Badge variant="outline" className="bg-blue-500/30">{row.getValue('relationship')}</Badge>
				: row.getValue('relationship')
		}
	},
	{ accessorKey: 'phone', header: t('phone'), },
]

export const contract_columns = (t) => [
	{
		accessorKey: 'contract_code', header: t('contract.code'),
		cell: ({ row }) => {
			return <div className='flex items-center gap-2'>
				<span>{row.getValue('contract_code')}</span>
				{row.original['is_latest'] === 1 && <span className="text-green-500"><IconCircleCheckFilled size={16} /></span>}
			</div>
		}
	},
	{ accessorKey: 'name', header: t('contract.name'), },
]