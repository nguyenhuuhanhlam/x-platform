import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { fmt_date } from '@/lib/helpers'
import { Separator } from '@/components/ui/separator'
import LabelValue from '@/components/ui-x/label-value'
import SummaryCard from '@/components/ui-x/summary-card'
import PiePercent from '@/components/ui-x/pie-percent'

import IncomeSourcesTabsContent from './income-sources-tabscontent'
import ExpenditureSourcesTabsContent from './expenditure-sources-tabscontent'
import { FUNDING_SOURCE, CONTRACT_STATUS } from '@/constants'
import { cfm_api } from '@/services/api'
import { fmt_thousand } from '@/lib/helpers'

//#region HELPERS
const styles = {
	container: 'flex flex-col sm:flex-row gap-4 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4',
	summary: 'grid grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 sm:max-h-52 sm:scrollbar-thin'
}

const LabelInfo = ({ text = 'text', info = false, infoClass = 'bg-slate-700' }) => (
	<div className="flex items-center justify-between">
		<span className="text-stone-500">{text}</span>
		{info && <span className={`text-[8pt] px-1 rounded-sm text-white ${infoClass}`}>{info}</span>}
	</div>
)

const ValueWithPie = ({ val = 0, vat = 0, pie = true, pieValue = 25, pieTotal = 100, pieColor = 'gray' }) => (
	<div className="flex items-center justify-between">
		<div className="flex flex-col">
			<span>{fmt_thousand(val)}</span>
			<span className="text-violet-800">{fmt_thousand(vat)}</span>
		</div>
		{pie && <PiePercent size={32} value={pieValue} total={pieTotal} color={pieColor} />}
	</div>
)

//#region COMPONENT
const ProjectTabsContractsCosts = ({ value, data }) => { // props data có đầy đủ các dữ liệu cần thiết phía trên, có thể tận dụng 
	const { t } = useTranslation()
	const funding = FUNDING_SOURCE[data?.funding_source]

	const { data: incomeSumData } = useQuery({
		queryKey: ['income-sums', data?.project_id],
		queryFn: () => cfm_api().get_con_incomes_summary(data?.project_id),
		select: res => res.data[0],
		enabled: data?.project_id !== undefined,
	})

	const { data: expenditureSumData } = useQuery({
		queryKey: ['expenditure-sums', data?.project_id],
		queryFn: () => cfm_api().get_con_expenditures_summary(data?.project_id),
		select: res => res.data[0],
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
						<LabelValue label="Contract Value" value={data?.contract_value} type="money" />
						<LabelValue
							label=""
							type="money"
							value={data?.contract_value_vat}
							valueClass="text-violet-500"
						/>

						<Separator />

						<LabelValue label="Total Planned" value={data?.total_planned} type="money" />
						<LabelValue
							label=""
							type="money"
							value={data?.total_planned_vat}
							valueClass="text-violet-500"
						/>

						<Separator />

						<LabelValue label="Total Original" value={data?.total_original} type="money" />
						<LabelValue
							label=""
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
					<div className="w-full sm:w-1/2 bg-gray-800 rounded-md p-4">
						<div className="text-xs pb-2 text-slate-400">Income Summary</div>
						<div className={styles.summary}>
							<SummaryCard
								label={<LabelInfo text="Planned" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(incomeSumData?.KH_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(incomeSumData?.KH_sum_vat)}</span>
									</div>
								)}
							/>

							<SummaryCard
								label={<LabelInfo text="Warranty" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(incomeSumData?.KH_BH_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(incomeSumData?.KH_BH_sum)}</span>
									</div>
								)}
							/>

							<SummaryCard
								label={<LabelInfo text="Completed" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(incomeSumData?.HT_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(incomeSumData?.HT_sum_vat)}</span>
									</div>
								)}
							/>
						</div>
					</div>

					<div className="w-full sm:w-1/2 bg-gray-800 rounded-md p-4">
						<div className="text-xs pb-2 text-slate-400">Expenditure Summary</div>
						<div className={styles.summary}>

							{/* LINE-HT */}
							<SummaryCard
								label={<LabelInfo text="Spent" info="Completed" infoClass="bg-green-700" />}
								value={<ValueWithPie val={expenditureSumData?.HT_sum} vat={expenditureSumData?.HT_sum_vat} pie={false} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Completed" infoClass="bg-green-700" />}
								value={(
									<div className="flex flex-col">
										<span>{0}</span>
										<span className="text-violet-800">{0}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Completed" infoClass="bg-green-700" />}
								value={<ValueWithPie val={0} vat={0} />}
							/>

							{/* LINE-NS */}
							<SummaryCard
								label={<LabelInfo text="Spent" info="Budget" infoClass="bg-cyan-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(expenditureSumData?.NS_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(expenditureSumData?.NS_sum_vat)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Budget" infoClass="bg-cyan-700" />}
								value={(
									<div className="flex flex-col">
										<span>{0}</span>
										<span className="text-violet-800">{0}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Budget" infoClass="bg-cyan-700" />}
								value={(
									<div className="flex flex-col">
										<span>{0}</span>
										<span className="text-violet-800">{0}</span>
									</div>
								)}
							/>

							{/* LINE-PS */}
							<SummaryCard
								label={<LabelInfo text="Spent" info="Extra" infoClass="bg-amber-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(expenditureSumData?.PS_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(expenditureSumData?.PS_sum_vat)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Extra" infoClass="bg-amber-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Extra" infoClass="bg-amber-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>

							{/* LINE-HH */}
							<SummaryCard
								label={<LabelInfo text="Spent" info="Commission" infoClass="bg-pink-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(expenditureSumData?.HH_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(expenditureSumData?.HH_sum_vat)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Commission" infoClass="bg-pink-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Commission" infoClass="bg-pink-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>

							{/* LINE-BH */}
							<SummaryCard
								label={<LabelInfo text="Spent" info="Warranty" infoClass="bg-blue-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(expenditureSumData?.BH_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(expenditureSumData?.BH_sum_vat)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Warranty" infoClass="bg-blue-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Warranty" infoClass="bg-blue-700" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(0)}</span>
										<span className="text-violet-800">{fmt_thousand(0)}</span>
									</div>
								)}
							/>

						</div>
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