import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover'
import { IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const ConfirmButton = ({ callback = (e) => { }, confirmText = 'OK' }) => {
	const [open, setOpen] = useState(false)
	const [text, setText] = useState('')
	const isValid = text.trim() === confirmText

	return (
		<Popover
			open={open} onOpenChange={(e) => {
				setOpen(e)
				if (!e) setText('')
			}}
		>
			<PopoverTrigger asChild>
				<Button variant="secondary" size="icon-sm">
					<IconTrash size={14} className="text-red-700" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="flex items-center gap-8">
				<Input
					className="font-bold"
					placeholder="Type OK to confirm"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>

				<Button size="sm" variant="secondary"
					disabled={!isValid}
					onClick={() => {
						callback()
						setOpen(false)
						setText('')
					}}
				>
					OK
				</Button>
			</PopoverContent>
		</Popover>
	)
}

export default ConfirmButton