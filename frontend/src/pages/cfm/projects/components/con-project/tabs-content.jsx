import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui-x/data-table'

import { con_columns } from '../../config'
import { cfm_api } from '@/services/api'
import { useDataTable } from '@/hooks/use-datatable'

import ProjectFormSheet from './project-form-sheet'
import ProjectDetailsDrawer from './project-details-drawer'

const { get_spa_cons, get_con_projects } = cfm_api()

const _TabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()
	const [sheetOpen, setSheetOpen] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)

	const { data: spaconsData } = useQuery({
		queryKey: ['spa_cons'],
		queryFn: get_con_projects,
		select: res => res?.data,
		enabled: true
	})

	const use_data_table = useDataTable(spaconsData, () => setDrawerOpen(true))

	return (
		<div>
			<TabsContent value={value}>

				<div className="flex items-center justify-end gap-2 mb-2">

					<Button
						variant="outline" size="icon" className="bg-green-900! hover:bg-green-700! rounded-full"
						onClick={() => setSheetOpen(true)}
					>
						<IconPlus />
					</Button>
				</div>

				<DataTable
					columns={con_columns(t)}
					data={spaconsData || []}
					rowSelection={use_data_table.rowSelection}
					onRowSelectionChange={use_data_table.handleSelectionChange}
				/>
			</TabsContent>

			<ProjectFormSheet open={sheetOpen} onOpenChange={setSheetOpen} />
			<ProjectDetailsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} data={use_data_table.rowSelectedData} />
		</div>
	)
}

export default _TabsContent