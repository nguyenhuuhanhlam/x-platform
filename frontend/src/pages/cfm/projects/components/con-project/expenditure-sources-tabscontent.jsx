import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui-x/data-table'
import { IconPlus } from '@tabler/icons-react'

import { expenditure_columns } from './config'
import { cfm_api } from '@/services/api'
import { useDataTable } from '@/hooks/use-data-table'
import ExpenditureFormDialog from './expenditure-form-dialog'

const ExpenditureSourcesTabsContent = ({ value, data }) => {
	const { get_con_expenditures, post_con_expenditure } = cfm_api()
	const { t } = useTranslation()
	const queryClient = useQueryClient()
	const queryKey = ['con-expenditures', data?.project_id]
	const [open, setOpen] = useState(false)

	const { data: expenditureData, isLoading } = useQuery({
		queryKey: queryKey,
		queryFn: () => get_con_expenditures(data?.project_id),
		select: res => res.data,
		enabled: data?.project_id !== undefined,
	})

	const createMutation = useMutation({
		mutationFn: ({ data }) => post_con_expenditure(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKey })
		},
		onError: () => {
			console.log('Failed to create expenditure source')
		},
	})

	const tableHook = useDataTable(
		expenditureData, {},
		(e) => { setOpen(true) }
	)

	const handleCreate = () => {
		createMutation.mutate({
			data: {
				project_id: data.project_id,
				title: '-',
				type: '-',
				payment_received_date: null,
				amount: 0,
				status: '-'
			}
		})
	}

	return (
		<TabsContent value={value}>
			<section className="flex flex-col w-full mx-auto sm:w-fit">
				<div className="flex justify-end mb-2">
					<Button
						variant="outline" size="icon" className="m-sm-add-button"
						onClick={handleCreate}
					>
						<IconPlus />
					</Button>
				</div>

				<DataTable
					columns={expenditure_columns(t)}
					data={expenditureData || []}
					onRowSelectionChange={tableHook.handleSelectionChange}
				/>

				<ExpenditureFormDialog
					open={open}
					onOpenChange={setOpen}
					data={tableHook.rowSelectedData}
				/>
			</section>
		</TabsContent>
	)
}

export default ExpenditureSourcesTabsContent