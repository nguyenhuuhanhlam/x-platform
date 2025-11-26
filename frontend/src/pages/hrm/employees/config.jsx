import { Badge } from '@/components/ui/badge'

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