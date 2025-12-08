import clsx from 'clsx'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const LabelValue = ({ label = "", labelClass, value = "", valueClass, vTag = false }) => {
	return (
		<div className="flex items-center space-x-4 justify-between">
			<Label className={clsx('text-neutral-500 block truncate', labelClass)}>{label}</Label>
			<div className={clsx('text-sm flex-1 text-right overflow-hidden text-ellipsis whitespace-nowrap', valueClass)}>
				{vTag ? <Badge variant="secondary">{value}</Badge> : value}
			</div>
		</div>
	)
}

export default LabelValue