import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui-x/data-table'

import { con_columns } from '../../config'
import { cfm_api } from '@/services/api'
import { useDataTable } from '@/hooks/use-data-table'

import ProjectFormSheet from './project-form-sheet'
import ProjectDetailsDrawer from './project-details-drawer'

const _TabsContent = ({ value, data = {} }) => {
	const { get_con_projects } = cfm_api()
	const { t } = useTranslation()
	const [sheetOpen, setSheetOpen] = useState(false)
	const [mode, setMode] = useState('new')
	const [drawerOpen, setDrawerOpen] = useState(false)

	const [editingData, setEditingData] = useState(null)

	const { data: spaconsData } = useQuery({
		queryKey: ['con-projects'],
		queryFn: get_con_projects,
		select: res => res?.data,
		enabled: true
	})

	const use_data_table = useDataTable(
		spaconsData,
		(e) => { setDrawerOpen(true) }
	)

	return (
		<div>
			<TabsContent value={value}>

				<div className="flex items-center justify-end gap-2 mb-2">
					<Button
						variant="outline" size="icon" className="bg-green-900! hover:bg-green-700! rounded-full"
						onClick={() => {
							setMode('new')
							setSheetOpen(true)
						}}
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

			<ProjectFormSheet
				open={sheetOpen} onOpenChange={setSheetOpen}
				data={editingData ?? use_data_table.rowSelectedData}
				mode={mode}
				callback={(e) => {
					setEditingData({ ...use_data_table.rowSelectedData, ...e })
				}}
			/>

			<ProjectDetailsDrawer
				open={drawerOpen} onOpenChange={setDrawerOpen}
				data={use_data_table.rowSelectedData}
				callback={(e) => {
					if (e.action === 'edit') {
						setMode('edit')
						setSheetOpen(true)
					}
				}}
			/>
		</div>
	)
}

export default _TabsContent