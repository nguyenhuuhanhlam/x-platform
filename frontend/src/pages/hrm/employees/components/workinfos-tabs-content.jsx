import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'

import LabelValue from '@/components/ui-x/label-value'
import { fmt_phonestring } from '@/lib/helpers'
import { hrm_api } from '@/services/api'
import { contract_columns } from '../config'

const WorkInfosTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()
	const { get_workinfos_by_employee, get_contracts } = hrm_api()
	const [latestContract, setLatestContract] = useState({})

	const { data: workinfosData } = useQuery({
		queryKey: ['workinfos', data.id],
		queryFn: () => get_workinfos_by_employee(data.id),
		enabled: !!data.id,
		select: res => res?.data
	})

	const { data: contractData } = useQuery({
		queryKey: ['contracts', data.id],
		queryFn: () => get_contracts(data.id),
		enabled: !!data.id,
		select: res => res?.data ?? [],
	})

	useEffect(() => {
		if (contractData?.length > 0) {
			const latestItem = contractData.find(item => item.is_latest)
			setLatestContract(latestItem || {})
		}
	}, [contractData])


	return (
		<TabsContent value={value} className="px-0 pt-0 gap-4 flex flex-col pb-8">
			<div className="flex flex-col md:flex-row gap-4">

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">Basic Infomation</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col p-0 gap-1">
							<div className="flex flex-col gap-8 sm:flex-row">
								<div className="flex flex-col gap-1 md:w-1/2">
									<LabelValue label="BadgeID" value={data?.badge_id} />
									<LabelValue label="Department" value={latestContract?.department_name ?? workinfosData?.department_name} />
									<LabelValue label="Position" value={latestContract?.position_name ?? workinfosData?.position_name} />
									<LabelValue label="Work Type" value={latestContract?.work_type_name} />
									<LabelValue label="Employee Type" value={latestContract?.employee_type_name} />
									<LabelValue label="Manager" value={latestContract?.manager_name} />
									<LabelValue label="Probation Start Date" value={dayjs(workinfosData?.probation_startdate).format('DD-MM-YYYY')} />
									<LabelValue label="Joining Date" value={dayjs(workinfosData?.joining_date).format('DD-MM-YYYY')} />
								</div>

								<div className="flex flex-col gap-1 md:w-1/2">
									<LabelValue label="Work Phone" value={fmt_phonestring(latestContract?.work_phone)} />
									<LabelValue label="Work Email" value={latestContract?.work_email} />
								</div>
							</div>
						</CardContent>

					</Card>
				</div>

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">Salary Infomation</CardTitle>
						</CardHeader>
					</Card>
				</div>

			</div>

			<DataTable
				columns={contract_columns(t)}
				data={contractData || []}
			/>

		</TabsContent>
	)
}

export default WorkInfosTabsContent