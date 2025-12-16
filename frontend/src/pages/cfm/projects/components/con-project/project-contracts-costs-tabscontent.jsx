import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import { cn } from '@/lib/utils'

import IncomeSourcesTabsContent from './income-sources-tabscontent'
import ExpenditureSourcesTabsContent from './expenditure-sources-tabscontent'
import { fmt_date } from '@/lib/helpers'
import { styles } from './config'
import { FUNDING_SOURCE, CONTRACT_STATUS } from '@/constants'


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
						<LabelValue label="Expiry Date" value={data?.expiry_date} />
						<LabelValue label="Effective Days" value={data?.effective_days} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Contract Value" value={data?.contract_value_vat} type="money" />
						<LabelValue label="Total Planned" value={data?.total_planned_vat} type="money" />
						<LabelValue label="Total Original" value={data?.total_original_vat} type="money" />
						<LabelValue label="Sales Discount" value={data?.sales_cost} type="money" />
					</div>
				</div>
			</section>

			<section className="flex flex-col items-center">
				<Tabs defaultValue="income">

					<div className="flex justify-center w-full">
						<TabsList>
							<TabsTrigger value="income">Income Sources</TabsTrigger>
							<TabsTrigger value="expenditure">Expenditure Sources</TabsTrigger>
						</TabsList>
					</div>

					<IncomeSourcesTabsContent value="income" data={data} />
					<ExpenditureSourcesTabsContent value="expenditure" data={data} />
				</Tabs>
			</section>
		</TabsContent>
	)
}

export default ProjectTabsContractsCosts