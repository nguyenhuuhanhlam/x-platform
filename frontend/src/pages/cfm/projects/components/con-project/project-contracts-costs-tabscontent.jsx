import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { IconPercentage, IconCircleFilled } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import LabelValue from '@/components/ui-x/label-value'
import SummaryCard from '@/components/ui-x/summary-card'
import SeparatorWithText from '@/components/ui-x/separator-with-text'

import IncomeSourcesTabsContent from './income-sources-tabscontent'
import ExpenditureSourcesTabsContent from './expenditure-sources-tabscontent'
import { FUNDING_SOURCE, CONTRACT_STATUS } from '@/constants'
import { cfm_api } from '@/services/api'
import { fmt_date, fmt_thousand } from '@/lib/helpers'
import { IncomesSummary } from './presentations/incomes-summary'

//#region HELPERS
const styles = {
	container: 'flex flex-col sm:flex-row gap-4 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4',
	summary: 'grid grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 sm:max-h-52 sm:scrollbar-thin',
	grid3: 'grid grid-cols-3 gap-y-1.25 [&>:not(:nth-child(3n+1))]:text-right [&>:not(:nth-child(3n+1))]:text-sm'
}

const LabelInfo = ({ text = 'text', info = false, infoClass = 'bg-slate-700' }) => (
	<div className="flex items-center justify-between">
		<span className="text-stone-500">{text}</span>
		{info && <span className={`text-[8pt] px-1 rounded-sm text-white ${infoClass}`}>{info}</span>}
	</div>
)

const ValueInfo = ({ val = 0, vat = 0, suffix = '' }) => (
	<div className="flex flex-col">
		<span className="flex items-center gap-2">{fmt_thousand(val)}{suffix}</span>
		<span className="flex items-center gap-2 text-violet-800">{fmt_thousand(vat)}{suffix}</span>
	</div>
)

// const LabelValueVAT = ({ label = '', val = 0, vat = 0 }) => (
// 	<div className="flex items-center justify-between">
// 		<Label className="m-lv-label">{label}</Label>
// 		<div className="flex gap-4">
// 			<div className="text-sm">{fmt_thousand(val)}</div>
// 			<div className="text-sm text-violet-500">{fmt_thousand(vat)}</div>
// 		</div>
// 	</div>
// )

//#region COMPONENT
const ProjectTabsContractsCosts = ({ value, data }) => { // props data có đầy đủ các dữ liệu cần thiết phía trên, có thể tận dụng 
	const { t } = useTranslation()
	const funding = FUNDING_SOURCE[data?.funding_source]

	const { data: incomeSumData } = useQuery({
		queryKey: ['income-sums', data?.project_id],
		queryFn: () => cfm_api().get_con_incomes_summary(data?.project_id),
		select: res => res.data,
		enabled: data?.project_id !== undefined,
	})

	const { data: expenditureSumData } = useQuery({
		queryKey: ['expenditure-sums', data?.project_id],
		queryFn: () => cfm_api().get_con_expenditures_summary(data?.project_id),
		select: res => res.data,
		enabled: data?.project_id !== undefined,
	})

	//#region RENDER
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
						<LabelValue label="Signed Date" value={fmt_date(data?.signed_date)} />
						<LabelValue label="Effective Days" value={data?.effective_days} />
						<LabelValue label="Expiry Date" value={fmt_date(data?.expiry_date)} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						<div className={styles.grid3}>
							<Label className="m-lv-label">Contract Value</Label>
							<div>{fmt_thousand(data?.contract_value)}</div>
							<div className="text-violet-500">{fmt_thousand(data?.contract_value_vat)}</div>

							<Label className="m-lv-label">Planned Total</Label>
							<div>{fmt_thousand(data?.total_planned)}</div>
							<div className="text-violet-500">{fmt_thousand(data?.total_planned_vat)}</div>

							<Label className="m-lv-label">Total Original</Label>
							<div>{fmt_thousand(data?.total_original)}</div>
							<div className="text-violet-500">{fmt_thousand(data?.total_original_vat)}</div>

							<Label className="m-lv-label">Sales Discount</Label>
							<div>{fmt_thousand(data?.sales_cost)}</div>
							<div></div>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col items-center py-4">
				<div className={styles.container}>
					<div className="w-full sm:w-1/2 bg-gray-800 rounded-md p-4">
						<IncomesSummary data={incomeSumData} />
					</div>

					<div className="w-full sm:w-1/2 bg-gray-800 rounded-md p-4">
						--
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