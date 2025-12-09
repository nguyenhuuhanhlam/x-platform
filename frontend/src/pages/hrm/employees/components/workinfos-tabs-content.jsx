import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import LabelValue from '@/components/ui-x/label-value'
import { hrm_api } from '@/services/api'
import { format_phonestring } from '@/lib/helpers'

const WorkInfosTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()
	const { get_workinfos_by_employee } = hrm_api()

	const { data: workinfosData } = useQuery({
		queryKey: ['workinfos', data.id],
		queryFn: () => get_workinfos_by_employee(data.id),
		enabled: !!data.id,
		select: res => res?.data
	})

	return (
		<TabsContent value={value} className="px-0 pt-0">
			<div className="flex flex-col md:flex-row gap-4 pb-8">

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">Basic Infomation</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col p-0 gap-1">
							<div className="flex flex-col sm:flex-row gap-8">
								<div>
									<LabelValue label="BadgeID" value={data?.badge_id} />
									<LabelValue label="Department" value={data?.department} />
									<LabelValue label="Position" value={data?.position} />
									<LabelValue label="Work Type" value={'-'} />
									<LabelValue label="Employee Type" value={data?.employee_type} />
									<LabelValue label="Manager" value={'-'} />
									<LabelValue label="Probation Start Date" value={workinfosData?.probation_startdate} />
									<LabelValue label="Joining Date" value={dayjs(workinfosData?.joining_date).format('DD-MM-YYYY')} />
								</div>

								<div>
									<LabelValue label="Phone" value={format_phonestring(workinfosData?.phone)} />
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
		</TabsContent>
	)
}

export default WorkInfosTabsContent