import { Label } from '@/components/ui/label'
import SeparatorWithText from '@/components/ui-x/separator-with-text'
import { Badge } from '@/components/ui/badge'
import { IconPercentage, IconCircleFilled } from '@tabler/icons-react'

import { fmt_thousand } from '@/lib/helpers'

const styles = {
	container: 'flex flex-col sm:flex-row gap-4 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4',
	summary: 'grid grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 sm:max-h-52 sm:scrollbar-thin',
	grid3: 'grid grid-cols-3 gap-y-1.25 [&>:not(:nth-child(3n+1))]:text-right [&>:not(:nth-child(3n+1))]:text-sm'
}

export const IncomesSummary = ({ data }) => {
	return (
		<>
			<div className="text-xs pb-2 text-slate-400">Incomes Summary</div>
			<div className="flex flex-col sm:flex-row gap-4">

				<div className="w-5/8">
					<div className={styles.grid3}>
						<Label className="m-lv-label">Planned</Label>
						<div>{fmt_thousand(data?.KH.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.KH.sum_vat)}</div>

						<Label className="m-lv-label">Completed</Label>
						<div>{fmt_thousand(data?.HT.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.HT.sum_vat)}</div>
					</div>

					<SeparatorWithText className="py-2">
						<Badge variant="outline" size="sm">
							<IconCircleFilled className="w-2! h-2! text-amber-500" />
							Tạm Ứng
						</Badge>
					</SeparatorWithText>

					<div className={styles.grid3}>
						<Label className="m-lv-label">Planned</Label>
						<div>{fmt_thousand(data?.KH.TU.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.KH.TU.sum_vat)}</div>

						<Label className="m-lv-label">Completed</Label>
						<div>{fmt_thousand(data?.HT.TU.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.HT.TU.sum_vat)}</div>
					</div>

					<SeparatorWithText className="py-2">
						<Badge variant="outline" size="sm">
							<IconCircleFilled className="w-2! h-2! text-lime-500" />
							Giai Đoạn
						</Badge>
					</SeparatorWithText>

					<div className={styles.grid3}>
						<Label className="m-lv-label">Planned</Label>
						<div>{fmt_thousand(data?.KH.GD.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.KH.GD.sum_vat)}</div>

						<Label className="m-lv-label">Completed</Label>
						<div>{fmt_thousand(data?.HT.GD.sum)}</div>
						<div className="text-violet-500">{fmt_thousand(data?.HT.GD.sum_vat)}</div>
					</div>

				</div>
				<div className="w-3/8 flex items-center justify-center bg-slate-900">PIE GRAPH</div>

				{/* <div className="grid grid-cols-3 gap-y-1.25 gap-2">
								
								<Label className="m-lv-label">Planned</Label>
								<div>{fmt_thousand(data?.KH.sum)}</div>
								<div className="text-violet-500">{fmt_thousand(data?.KH.sum_vat)}</div>

								<Label className="m-lv-label">Warranty</Label>
								<div>{fmt_thousand(data?.KH.BH.sum)}</div>
								<div className="text-violet-500">{fmt_thousand(data?.KH.BH.sum_vat)}</div>

							</div> */}
				{/* <SummaryCard
								label={<LabelInfo text="Planned" />}
								value={<ValueInfo val={data?.HT.sum} vat={data?.HT.sum_vat} />}
							/>

							<SummaryCard
								label={<LabelInfo text="Warranty" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(data?.KH_BH_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(data?.KH_BH_sum)}</span>
									</div>
								)}
							/>

							<SummaryCard
								label={<LabelInfo text="Completed" />}
								value={(
									<div className="flex flex-col">
										<span>{fmt_thousand(data?.HT_sum)}</span>
										<span className="text-violet-800">{fmt_thousand(data?.HT_sum_vat)}</span>
									</div>
								)}
							/> */}

			</div>
		</>
	)
} 