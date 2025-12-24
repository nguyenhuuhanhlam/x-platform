import clsx from 'clsx'

const SummaryCard = ({
	wrapClass = ''
}) => {
	return (
		<div className={clsx(wrapClass, "bg-slate-800 rounded-md p-2")}>
			<div>description</div>
			<div className="text-xl">150.000.000.000</div>
		</div>
	)
}

export default SummaryCard