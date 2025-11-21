import { useQuery } from '@tanstack/react-query'
import { useTranslation } from "react-i18next"
// import { useMemo } from 'react'

import { employees_api } from '@/services/api'
import { employee_columns } from './config'
import { DataTable } from '@/components/ui-x/data-table'

const EmployeesPage = () => {
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => employees_api().get_active_list(),
		select: res => res?.data,
		enabled: true
	})

	return (
		<div className="p-4">
			<DataTable
				columns={employee_columns(t)}
				data={data || []}
				usePaging={true}
			/>
		</div>
	)
}

export default EmployeesPage