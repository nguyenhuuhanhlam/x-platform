import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui-x/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconPlus } from '@tabler/icons-react'

import { hrm_api, minio_api } from '@/services/api'
import LabelValue from '@/components/ui-x/label-value'
import { family_columns } from '../config'
import { fmt_phonestring } from '@/lib/helpers'

const { get_personal, get_families } = hrm_api()
const { get_presigned } = minio_api()

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

	const { data: avatarData } = useQuery({
		queryKey: ['avatar', data.id],
		queryFn: () => get_presigned(data.id, `${data.id}-avatar.png`),
		enabled: true
	})

	return (
		<TabsContent value={value} className="px-0 pt-0 pb-4">
			<div className="flex flex-col md:flex-row gap-4">

				<div className="w-full md:w-1/2">
					<Card className="p-4">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">
								<span>Personal Infomation</span>
								<span className="text-[8pt] text-neutral-300 bg-neutral-800 p-1 rounded-full">{data.id}</span>
							</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col w-full gap-4 p-0 sm:flex-row">
							<div className="flex items-center justify-center max-h-full mb-4 sm:min-w-[150px]">
								<Avatar className="w-24 h-24 border-4">
									<AvatarImage src={avatarData?.url} />
									<AvatarFallback>{data.firstname[0]}</AvatarFallback>
								</Avatar>
							</div>

							<div className="flex flex-col sm:max-w-[380px] sm:w-full gap-1">
								<LabelValue label="Email" value={personalData?.email} />
								<LabelValue label="Phone" value={fmt_phonestring(personalData?.phone)} />
								<LabelValue label={t('gender')} value={t(personalData?.gender)} />
								<LabelValue label={t('birthday')} value={dayjs(personalData?.dob).format('DD-MM-YYYY')} />
								<LabelValue label={t('qualification')} value={personalData?.qualification} />
								<LabelValue label={t('address')} value={personalData?.address} />
								<LabelValue label={t('province')} value={personalData?.province_name} />
								<LabelValue label={t('marital')} value={t(`marital.${personalData?.marital}`)} />
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="w-full md:w-1/2">

					<div className="flex items-center justify-between gap-2 mb-2">
						<p className="font-bold">Immediate Family</p>
						<Button
							variant="outline" size="icon" className="bg-blue-800! hover:bg-blue-700! rounded-full"
							onClick={() => { }}
						>
							<IconPlus />
						</Button>
					</div>

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