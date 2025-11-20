export const employee_columns = [
	{
		accessorKey: "fullname",
		header: "Full Name",
		accessorFn: (row) => `${row.lastname} ${row.firstname}`,
		cell: ({ row }) => {
			return <div>{row.getValue('fullname')}</div>
		}
	},
	{
		accessorKey: 'department',
		header: "Department",
	}
]