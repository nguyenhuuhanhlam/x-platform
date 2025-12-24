import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import LabelValue from '@/components/ui-x/label-value'
import SummaryCard from '@/components/ui-x/summary-card'

import IncomeSourcesTabsContent from './income-sources-tabscontent'
import ExpenditureSourcesTabsContent from './expenditure-sources-tabscontent'
import { FUNDING_SOURCE, CONTRACT_STATUS } from '@/constants'
import { cfm_api } from '@/services/api'
import { fmt_thousand } from '@/lib/helpers'

//#region HELPERS
const styles = {
	container: 'flex flex-col sm:flex-row gap-4 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4'
}

const LabelVAT = ({ text = 'text', vat = false }) => (
	<div className="flex items-center justify-between">
		<span className="text-stone-500">{text}</span>
		{vat && <span className="text-[8pt] text-violet-700">VAT</span>}
	</div>
)

//#region COMPONENT
const ProjectTabsContractsCosts = ({ value, data }) => {
	const { t } = useTranslation()
	const funding = FUNDING_SOURCE[data?.funding_source]

	const { data: incomeSumData } = useQuery({
		queryKey: ['income-sums', data?.project_id],
		queryFn: () => cfm_api().get_con_incomes_summary(data?.project_id),
		select: res => res.data[0],
		enabled: data?.project_id !== undefined,
	})

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

			<section className="flex flex-col items-center py-4">
				<div className={styles.container}>

					<div className="w-full sm:w-1/2 bg-slate-700 rounded-md p-4">
						<div className="text-xs pb-2 text-slate-900">Income Summary</div>
						<div className="grid grid-cols-3 gap-4">
							<SummaryCard label={<LabelVAT text="Planned" />} value={fmt_thousand(incomeSumData?.KH_sum)} />
							<SummaryCard label={<LabelVAT text="Planned" vat={true} />} value={fmt_thousand(incomeSumData?.KH_sum_vat)} />
							<SummaryCard label={<LabelVAT text="Warranty" />} value={fmt_thousand(incomeSumData?.KH_BH_sum)} />
							<SummaryCard label={<LabelVAT text="Warranty" vat={true} />} value={fmt_thousand(incomeSumData?.KH_BH_sum_vat)} />
						</div>
					</div>

					<div className="w-full sm:w-1/2 bg-slate-700 rounded-md p-4">
						<div className="text-xs pb-2 text-slate-900">Expenditure Summary</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col items-center">
				<div className="flex flex-col w-full gap-4 pb-8 mx-auto sm:w-[1180px]">
					<Tabs defaultValue="income">

						<div className="flex items-center justify-center">
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