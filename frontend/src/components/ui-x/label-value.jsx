import clsx from 'clsx'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { IconLoader2 } from '@tabler/icons-react'

const LabelValue = ({ label = "", labelClass, value = "", valueClass, vTag = false, loading = false }) => {
	return (
		<div className="flex items-center space-x-4 justify-between">
			<Label className={clsx('text-neutral-500 block truncate', labelClass)}>{label}</Label>
			<div className={clsx('text-sm flex-1 text-right overflow-hidden text-ellipsis whitespace-nowrap flex justify-end items-center gap-2', valueClass)}>
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