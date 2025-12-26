export const ExpendituresSummary = ({ }) => {
	return (
		<>
			<div className="text-xs pb-2 text-slate-400">Expenditure Summary</div>
			<div className={styles.summary}>

				{/* HT - COMPELETED */}
				{/* <SummaryCard
								label={<LabelInfo text="Spent" info="Completed" infoClass="bg-green-700" />}
								value={<ValueInfo val={expenditureSumData?.HT.sum} vat={expenditureSumData?.HT.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Completed" infoClass="bg-green-700" />}
								value={<ValueInfo val={expenditureSumData?.KH.sum} vat={expenditureSumData?.KH.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Completed" infoClass="bg-green-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.sum / data?.total_planned * 100}
									vat={expenditureSumData?.HT.sum_vat / data?.total_planned_vat * 100} suffix={<IconPercentage size={12} />} />}
							/> */}

				{/* NS - BUDGET */}
				{/* <SummaryCard
								label={<LabelInfo text="Spent" info="Budget" infoClass="bg-cyan-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.NS.sum}
									vat={expenditureSumData?.HT.NS.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Budget" infoClass="bg-cyan-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.NS.sum}
									vat={expenditureSumData?.KH.NS.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Budget" infoClass="bg-cyan-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.NS.sum / expenditureSumData?.HT.sum * 100}
									vat={expenditureSumData?.HT.NS.sum_vat / expenditureSumData?.HT.sum_vat * 100}
									suffix={<IconPercentage size={12} />} />}
							/> */}

				{/* PS - EXTRA */}
				{/* <SummaryCard
								label={<LabelInfo text="Spent" info="Extra" infoClass="bg-amber-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.PS.sum}
									vat={expenditureSumData?.HT.PS.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Extra" infoClass="bg-amber-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.PS.sum}
									vat={expenditureSumData?.KH.PS.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Extra" infoClass="bg-amber-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.PS.sum / expenditureSumData?.HT.sum * 100}
									vat={expenditureSumData?.KH.PS.sum_vat / expenditureSumData?.HT.sum_vat * 100}
									suffix={<IconPercentage size={12} />} />}
							/> */}

				{/* HH - COMMISSION */}
				{/* <SummaryCard
								label={<LabelInfo text="Spent" info="Commission" infoClass="bg-pink-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.HH.sum}
									vat={expenditureSumData?.HT.HH.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Commission" infoClass="bg-pink-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.HH.sum}
									vat={expenditureSumData?.KH.HH.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Commission" infoClass="bg-pink-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.HH.sum / expenditureSumData?.HT.sum * 100}
									vat={expenditureSumData?.KH.HH.sum_vat / expenditureSumData?.HT.sum_vat * 100}
									suffix={<IconPercentage size={12} />} />}
							/> */}

				{/* BH - WARRANTY */}
				{/* <SummaryCard
								label={<LabelInfo text="Spent" info="Warranty" infoClass="bg-blue-700" />}
								value={<ValueInfo
									val={expenditureSumData?.HT.BH.sum}
									vat={expenditureSumData?.HT.BH.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Remaining" info="Warranty" infoClass="bg-blue-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.BH.sum}
									vat={expenditureSumData?.KH.BH.sum_vat} />}
							/>
							<SummaryCard
								label={<LabelInfo text="Rate" info="Warranty" infoClass="bg-blue-700" />}
								value={<ValueInfo
									val={expenditureSumData?.KH.BH.sum / expenditureSumData?.HT.sum * 100}
									vat={expenditureSumData?.KH.BH.sum_vat / expenditureSumData?.HT.sum_vat * 100}
									suffix={<IconPercentage size={12} />} />}
							/> */}

			</div>
		</>
	)
} 