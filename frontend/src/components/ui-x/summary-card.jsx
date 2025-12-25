import clsx from 'clsx'

const SummaryCard = ({
	wrapClass = '',
	label = 'description',
	value = 'values',
	valueClass = 'text-black'
}) => {
	return (
		<div className={clsx(wrapClass, "bg-slate-300 rounded-md p-2")}>
			<div className="text-sm text-black">{label}</div>
			<div className={clsx('text-base', valueClass)}>{value}</div>
		</div>
	)
}

export default SummaryCard