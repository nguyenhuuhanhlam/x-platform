import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { hrm_api } from '@/services/api'
import { employee_columns } from './config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from '@/components/ui-x/data-table'

import EmployeeFormSheet from './components/employee-form-sheet'
import EmployeeDetailsDrawer from './components/employee-details-drawer'

import { useDataTable } from '@/hooks/use-data-table'

const EmployeesPage = () => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState('')
	const [sheetOpen, setSheetOpen] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => hrm_api().get_active_list(),
		select: res => res?.data,
		enabled: true
	})

	const use_data_table = useDataTable(data,{}, () => setDrawerOpen(true))

	return (
		<div className="p-4">
			<div className="flex items-center justify-between gap-2 mb-2">
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
				rowSelection={use_data_table.rowSelection}
				onRowSelectionChange={use_data_table.handleSelectionChange}
				usePaging={true}
			/>

			<EmployeeFormSheet open={sheetOpen} onOpenChange={setSheetOpen} />
			<EmployeeDetailsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} data={use_data_table.rowSelectedData} />
		</div>
	)
}

export default EmployeesPage