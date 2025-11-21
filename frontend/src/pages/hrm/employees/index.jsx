import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { employees_api } from '@/services/api'
import { employee_columns } from './config'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui-x/data-table'

const EmployeesPage = () => {
	const [filter, setFilter] = useState('')
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => employees_api().get_active_list(),
		select: res => res?.data,
		enabled: true
	})

	return (
		<div className="p-4">
			<Input
				placeholder="🔍 Search..."
				className="w-full sm:w-72 rounded-lg"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>

			<DataTable
				columns={employee_columns(t)}
				data={data || []}
				globalFilter={filter}
				setGlobalFilter={setFilter}
				usePaging={true}
			/>
		</div>
	)
}

export default EmployeesPage