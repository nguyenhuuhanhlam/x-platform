import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'  

import LabelValue from '@/components/ui-x/label-value'

const WorkInfosTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()

	return (
		<TabsContent value={value} className="px-4 pt-4">
			<div className="flex flex-col md:flex-row gap-4">

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">Basic Infomation</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col p-0 gap-1">
							<LabelValue label="BadgeID" value={'-'} />
							<LabelValue label="Department" value={'-'} />
							<LabelValue label="Work Type" value={'-'} />
							<LabelValue label="Employee Type" value={'-'} />
							<LabelValue label="Manager" value={'-'} />
							<LabelValue label="Probation Start Date" value={'-'} />
							<LabelValue label="Joining Date" value={'-'} />
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