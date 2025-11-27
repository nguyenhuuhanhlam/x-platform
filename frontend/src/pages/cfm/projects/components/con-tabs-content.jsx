import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'

import { con_columns } from '../config'
import { cfm_api } from '@/services/api'

const { get_spa_cons, get_con_projects } = cfm_api()

const CONTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()
	const { data: spaconsData } = useQuery({
		queryKey: ['spa_cons'],
		queryFn: get_con_projects,
		select: res => res?.data || [],
		enabled: true
	})

	return (
		<TabsContent value={value}>
			<DataTable
				columns={con_columns(t)}
				data={spaconsData}
			/>
		</TabsContent>
	)
}

export default CONTabsContent