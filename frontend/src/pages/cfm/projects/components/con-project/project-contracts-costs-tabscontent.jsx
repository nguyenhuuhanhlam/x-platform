import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import { Separator } from '@/components/ui/separator'
import LabelValue from '@/components/ui-x/label-value'
import { cn } from '@/lib/utils'

import IncomeSourcesTabsContent from './income-sources-tabscontent'
import ExpenditureSourcesTabsContent from './expenditure-sources-tabscontent'
import { FUNDING_SOURCE, CONTRACT_STATUS } from '@/constants'

const styles = {
	container: 'flex flex-col sm:flex-row gap-4 pb-8 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4'
}

const ProjectTabsContractsCosts = ({ value, data }) => {
	const { t } = useTranslation()
	const funding = FUNDING_SOURCE[data?.funding_source]

	return (
		<TabsContent value={value}>
			<section className="flex flex-col items-center">
				<div className={styles.container}>
					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Contract Name" valueClass="truncate"
							value={data?.contract_name || '-'}
						/>

						<LabelValue label="Contract Code" value={data?.contract_code || '-'} />

						<LabelValue label="Funding Source"
							value={funding?.text}
							vTag={true}
							tagClass={funding?.tagClass}
						/>

						<LabelValue label="Contract Status" value={CONTRACT_STATUS[data?.contract_status]?.text || '-'} vTag={true} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Signed Date" value={data?.signed_date} />
						<LabelValue label="Effective Days" value={data?.effective_days} />
						<LabelValue label="Expiry Date" value={data?.expiry_date} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Contract Value" value={data?.contract_value} type="money" />
						<LabelValue
							label="VAT"
							type="money"
							value={data?.contract_value_vat}
							valueClass="text-violet-500"
						/>

						<Separator />

						<LabelValue label="Total Planned" value={data?.total_planned} type="money" />
						<LabelValue
							label="VAT"
							type="money"
							value={data?.total_planned_vat}
							valueClass="text-violet-500"
						/>

						<Separator />

						<LabelValue label="Total Original" value={data?.total_original} type="money" />
						<LabelValue
							label="VAT"
							type="money"
							value={data?.total_original_vat}
							valueClass="text-violet-500"
						/>

						<Separator />

						<LabelValue label="Sales Discount" value={data?.sales_cost} type="money" />
					</div>
				</div>
			</section>

			<section className="flex flex-col items-center">
				<div className="flex flex-col w-full gap-4 pb-8 mx-auto sm:w-[1180px]">
					<Tabs defaultValue="income">

						<div className="flex justify-center">
							<TabsList>
								<TabsTrigger value="income">Income Sources</TabsTrigger>
								<TabsTrigger value="expenditure">Expenditure Sources</TabsTrigger>
							</TabsList>
						</div>

						<IncomeSourcesTabsContent value="income" data={data} />
						<ExpenditureSourcesTabsContent value="expenditure" data={data} />
					</Tabs>
				</div>
			</section>
		</TabsContent>
	)
}

export default ProjectTabsContractsCosts