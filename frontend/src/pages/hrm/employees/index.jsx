import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'


import { employees_api } from '@/services/api'
import { employee_columns } from './config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from '@/components/ui-x/data-table'

const EmployeesPage = () => {
	const [filter, setFilter] = useState('')
	const [rowSelection, setRowSelection] = useState({})
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => employees_api().get_active_list(),
		select: res => res?.data,
		enabled: true
	})

	const selectedKey = Object.keys(rowSelection)[0]
	const selectedRow = selectedKey ? data[selectedKey] : null

	return (
		<div className="p-4">

			{/* - - - TOOLBAR - - - */}
			<div className="flex items-center justify-between gap-2">
				<Input
					placeholder="🔍 Search..."
					className="w-full sm:w-72 rounded-lg"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
				<Button variant="outline" size="icon" className="bg-green-900! hover:bg-green-700! rounded-full">
					<IconPlus />
				</Button>
			</div>

			<DataTable
				columns={employee_columns(t)}
				data={data || []}
				globalFilter={filter}
				setGlobalFilter={setFilter}
				rowSelection={rowSelection}
				onRowSelectionChange={setRowSelection}
				usePaging={true}
			/>
		</div>
	)
}

export default EmployeesPage