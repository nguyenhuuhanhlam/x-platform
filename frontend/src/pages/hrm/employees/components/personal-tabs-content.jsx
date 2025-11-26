import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card'

import { employees_api } from '@/services/api'
import LabelValue from '@/components/ui-x/label-value'
import { family_columns } from '../config'

const { get_personal, get_families } = employees_api()

const PersonalTabsContent = ({ value, data = {} }) => {
	const { t } = useTranslation()

	const { data: personalData } = useQuery({
		queryKey: ['personal', data.id],
		queryFn: () => get_personal(data.id),
		select: res => res?.data[0],
		enabled: true
	})

	const { data: familyData } = useQuery({
		queryKey: ['family', data.id],
		queryFn: () => get_families(data.id),
		select: res => res?.data,
		enabled: true
	})

	return (
		<TabsContent value={value} className="px-4 pt-4">
			<div className="flex flex-col md:flex-row gap-4">

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0">
							<CardTitle>Personal Infomation</CardTitle>
						</CardHeader>

						<CardContent className="p-0 w-full sm:max-w-fit gap-1 flex flex-col">
							<LabelValue label="Email" value={personalData?.email} />
							<LabelValue label="Phone" value={personalData?.phone} />
							<LabelValue label={t('gender')} value={t(personalData?.gender)} />
							<LabelValue label={t('birthday')} value={personalData?.dob} />
							<LabelValue label={t('qualification')} value={personalData?.qualification} />
							<LabelValue label={t('address')} value={personalData?.address} />
							<LabelValue label={t('province')} value={personalData?.province_name} />
							<LabelValue label={t('marital')} value={t(`marital.${personalData?.marital}`)} />
						</CardContent>
					</Card>
				</div>

				<div className="w-full md:w-1/2">
					<DataTable
						columns={family_columns(t)}
						data={familyData || []}
						usePaging={false}
					/>
				</div>
			</div>
		</TabsContent>
	)
}

export default PersonalTabsContent