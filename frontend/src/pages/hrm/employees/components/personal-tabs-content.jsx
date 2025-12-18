import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconPlus, IconEdit } from '@tabler/icons-react'

import { DataTable } from '@/components/ui-x/data-table'
import LabelValue from '@/components/ui-x/label-value'
import FamilyFormDialog from './family-form-dialog'

import { hrm_api, minio_api } from '@/services/api'
import { useDataTable } from '@/hooks/use-data-table'
import { family_columns } from '../config'
import { fmt_phonestring } from '@/lib/helpers'

const { get_personal, get_families } = hrm_api()
const { get_presigned } = minio_api()

const styles = {
	container: 'flex flex-col md:flex-row w-full gap-4 mx-auto items-stretch md:max-w-[1180px]',
	card: 'w-full md:w-1/2 flex'
}

//#region COMPONENT
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

	const tableHook = useDataTable(
		familyData,
		{},
		(e) => {
			console.log(e)
		})

	return (
		<TabsContent value={value} className="px-0 pt-0 pb-8">
			<div className={styles.container}>

				<div className={styles.card}>
					<Card className="p-4 flex-1">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">
								<span>Personal Infomation</span>

								<Button
									variant="outline" size="icon" className="m-sm-add-button"
									onClick={() => { }}
								>
									<IconEdit />
								</Button>
							</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col w-full gap-4 p-0 sm:flex-row">
							<div className="flex sm:w-2/3 items-center justify-center py-4">
								<Avatar className="w-24 h-24 border-4">
									<AvatarImage src={avatarData?.url} />
									<AvatarFallback>{data.firstname[0]}</AvatarFallback>
								</Avatar>
							</div>

							<div className="flex flex-col gap-1 w-xs sm:w-full">
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

				<div className={styles.card}>
					<Card className="p-4 flex-1">
						<CardHeader className="p-0 gap-0">
							<CardTitle className="flex justify-between items-center">
								<span>Family Infomation</span>

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
								columns={family_columns(t)}
								data={familyData || []}
								usePaging={false}
								onRowSelectionChange={tableHook.handleSelectionChange}
							/>
						</CardContent>
					</Card>

				</div>

				<FamilyFormDialog />
			</div>
		</TabsContent>
	)
}

export default PersonalTabsContent