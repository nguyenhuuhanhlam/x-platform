export const employee_columns = (t) => [
	{
		accessorKey: "fullname",
		header: t('fullname'),
		accessorFn: (row) => `${row.lastname} ${row.firstname}`,
		cell: ({ row }) => {
			return <div>{row.getValue('fullname')}</div>
		}
	},
	{
		accessorKey: 'department',
		header: t('department'),
	},
	{
		accessorKey: 'position',
		header: t('position'),
	},
	{
		accessorKey: 'employee_type',
		header: t("employee_type")
	}
]