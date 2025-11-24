import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { employees_api } from '@/services/api'
import { employee_columns } from './config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from '@/components/ui-x/data-table'

import EmployeeFormSheet from './components/employee-form-sheet'
import EmployeeDetailsDrawer from './components/employee-details-drawer'

const EmployeesPage = () => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState('')
	const [rowSelection, setRowSelection] = useState({})
	const [sheetOpen, setSheetOpen] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => employees_api().get_active_list(),
		select: res => res?.data,
		enabled: true
	})

	const handleSelectionChange = (updater) => {
		setRowSelection((old) => {
			const newState = typeof updater === 'function' ? updater(old) : updater

			const selectedKey = Object.keys(newState)[0]
			if (selectedKey) {
				const rowData = data[selectedKey]
				setDrawerOpen(true)
			}

			return newState
		})
	}

	return (
		<div className="p-4">
			<div className="flex items-center justify-between gap-2">
				<Input
					placeholder="🔍 Search..."
					className="w-full sm:w-72 rounded-lg"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
				<Button
					variant="outline" size="icon" className="bg-green-900! hover:bg-green-700! rounded-full"
					onClick={() => setSheetOpen(true)}
				>
					<IconPlus />
				</Button>
			</div>

			<DataTable
				columns={employee_columns(t)}
				data={data || []}
				globalFilter={filter}
				setGlobalFilter={setFilter}
				rowSelection={rowSelection}
				onRowSelectionChange={handleSelectionChange}
				usePaging={true}
			/>

			<EmployeeFormSheet open={sheetOpen} onOpenChange={setSheetOpen} />
			<EmployeeDetailsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} data={rowSelection} />
		</div>
	)
}

export default EmployeesPage