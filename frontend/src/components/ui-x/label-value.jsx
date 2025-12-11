import clsx from 'clsx'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { IconLoader2 } from '@tabler/icons-react'

const LabelValue = ({
	label = '', labelClass,
	value = '', valueClass,
	vTag = false,
	loading = false
}) => {
	return (
		<div className="flex items-center space-x-4 justify-between leading-tight">
			<Label className={clsx('m-lv-label', labelClass)}>{label}</Label>

			<div className={clsx('m-lv-value', valueClass)}>
				{loading ? (
					<>
						<span className="text-neutral-500 italic text-xs">Loading...</span>
						<IconLoader2 size={14} className="animate-spin text-neutral-400" />
					</>
				) : (
					vTag ? <Badge variant="secondary">{value}</Badge> : value
				)}
			</div>

		</div>
	)
}

export default LabelValue