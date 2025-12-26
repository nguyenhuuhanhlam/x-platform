import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconPlus, IconEdit } from '@tabler/icons-react'

import LabelValue from '@/components/ui-x/label-value'
import { fmt_date, si_deduction } from '@/lib/helpers'
import { hrm_api } from '@/services/api'
import { contract_columns } from '../config'

const WorkInfosTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()
	const { get_contracts, get_pit_deduction } = hrm_api()
	const [latestContract, setLatestContract] = useState({})

	const { data: contractData } = useQuery({
		queryKey: ['contracts', data.id],
		queryFn: () => get_contracts(data.id),
		enabled: !!data.id,
		select: res => res.data,
	})

	const { data: pitData } = useQuery({
		queryKey: ['pit', data.id],
		queryFn: () => get_pit_deduction(data.id),
		enabled: !!data.id,
		select: res => res.data,
	})

	useEffect(() => {
		if (contractData?.length > 0) {
			const latestItem = contractData.find(item => item.is_latest)
			setLatestContract(latestItem || {})
		}
	}, [contractData])

	return (
		<TabsContent value={value} className="px-0 pt-0 gap-4 flex flex-col pb-8">
			<div className="flex flex-col w-full gap-4 items-stretch mx-auto sm:flex-row sm:max-w-[1180px]">
				<div className="w-full md:w-1/2 flex">
					<Card className="p-4 flex-1">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">
								<span>Basic Infomation</span>
								<Button
									variant="outline" size="icon" className="m-sm-add-button"
									onClick={() => { }}
									disabled={contractData?.length > 0}
								>
									<IconEdit />
								</Button>
							</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col p-0 gap-1">
							<div className="flex flex-col gap-8 sm:flex-row">
								<div className="flex flex-col gap-1 md:w-1/2">
									<LabelValue label="BadgeID" value={data?.badge_id} />
									<LabelValue label="Department" value={latestContract?.department_name} />
									<LabelValue label="Position" value={latestContract?.position_name} />
									<LabelValue label="Work Type" value={latestContract?.work_type_name} />
									<LabelValue label="Employee Type" value={latestContract?.employee_type_name} />
									<LabelValue label="Manager" value={latestContract?.manager_name} />
									<LabelValue label="Probation Start Date" value={fmt_date(dayjs(latestContract?.probation_startdate).format('DD-MM-YYYY'))} />
									<LabelValue label="Joining Date" value={fmt_date(dayjs(latestContract?.joining_date).format('DD-MM-YYYY'))} />
								</div>

								<div className="flex flex-col gap-1 md:w-1/2">
									<LabelValue label="Work Phone" value={latestContract?.work_phone} type="phone" />
									<LabelValue label="Work Email" value={latestContract?.work_email} />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="w-full md:w-1/2 flex">
					<Card className="p-4 flex-1">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">Salary Infomation</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col sm:flex-row p-0 gap-8">
							<div className="flex flex-col gap-1 md:w-1/2">
								<LabelValue label="Basic Pay" value={latestContract?.basic_pay} type="money" />
								<LabelValue label="Position Pay" value={latestContract?.position_pay} type="money" />
								<LabelValue label="Management Allowance" value={latestContract?.management_allowance} type="money" />
								<LabelValue label="Phone Allowance" value={latestContract?.phone_allowance} type="money" />
								<LabelValue label="Field Allowance" value={latestContract?.field_allowance} type="money" />
								<LabelValue label="Additional Allowance" value={latestContract?.additional_allowance} type="money" />
							</div>

							<div className="flex flex-col gap-1 md:w-1/2">
								<LabelValue label="Gross Pay" type="money"
									value={
										(latestContract?.basic_pay || 0) +
										(latestContract?.position_pay || 0) +
										(latestContract?.management_allowance || 0) +
										(latestContract?.phone_allowance || 0) +
										(latestContract?.field_allowance || 0) +
										(latestContract?.additional_allowance || 0)
									}
								/>

								<LabelValue label="SI Deduction" type="money"
									value={
										latestContract?.basic_pay
											? si_deduction(latestContract.basic_pay, latestContract.contract_type)
											: 0
									}
								/>

								<LabelValue label="PIT Deductions" value={pitData?.pit} type="money" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="w-full mx-auto sm:max-w-[1180px]">
				<Card className="p-4">
					<CardHeader className="p-0 gap-0">
						<CardTitle className="flex justify-between items-center">
							<span>Contract Infomation</span>

							<Button
								variant="outline" size="icon" className="m-sm-add-button"
								onClick={() => { }}
							>
								<IconPlus />
							</Button>
						</CardTitle>
					</CardHeader>

					<CardContent className="flex flex-col w-full p-0 py-0">
						<DataTable
							columns={contract_columns(t)}
							data={contractData || []}
						/>
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	)
}

export default WorkInfosTabsContent