import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui-x/data-table'
import { IconPlus } from '@tabler/icons-react'

import { income_columns } from './config'
import { cfm_api } from '@/services/api'
import { useDataTable } from "@/hooks/v2/use-data-table"

const IncomeSourcesTabsContent = ({ value, data }) => {
	const { get_con_incomes, post_con_income } = cfm_api()
	const { t } = useTranslation()
	const queryClient = useQueryClient()
	// const [editingRowId, setEditingRowId] = useState(null)
	const queryKey = ['con-incomes', data?.project_id]

	const { data: incomeData, isLoading } = useQuery({
		queryKey: queryKey,
		queryFn: () => get_con_incomes(data?.project_id),
		select: res => res.data,
		enabled: data?.project_id !== undefined,
	})

	const createMutation = useMutation({
		mutationFn: ({ data }) => post_con_income(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKey })
		},
		onError: () => {
			msg.error('Failed to create income source')
		},
	})

	const tableManager = useDataTable({
		data: incomeData || [],
		queryKey: queryKey,
		onSave: (rowOriginal) => {
			console.log('Saving row:', rowOriginal)
		}
	})

	return (
		<TabsContent value={value}>
			<section className="flex flex-col items-center">
				<div className="w-full flex justify-end my-2">
					<Button
						variant="outline" size="icon" className="m-sm-add-button"
						onClick={() => {
							createMutation.mutate({
								data: {
									project_id: data.project_id,
									title: 'New Item',
									type: 0,
									payment_received_date: null,
									amount: 0,
									status: '-'
								}
							})
						}}
					>
						<IconPlus />
					</Button>
				</div>

				<div className="flex flex-col">
					<DataTable
						columns={income_columns(t)}
						{...tableManager}
					/>
				</div>
			</section>
		</TabsContent>
	)
}

export default IncomeSourcesTabsContent