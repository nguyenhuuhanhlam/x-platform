import clsx from 'clsx'

const SummaryCard = ({
	wrapClass = '',
	label = 'description',
	value = 'values'
}) => {
	return (
		<div className={clsx(wrapClass, "bg-slate-300 rounded-md p-2")}>
			<div className="text-black">{label}</div>
			<div className="text-xl text-black">{value}</div>
		</div>
	)
}

export default SummaryCard