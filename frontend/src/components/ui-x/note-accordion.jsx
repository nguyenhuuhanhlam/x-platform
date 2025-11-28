import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, } from '@/components/ui/accordion'

const NoteAccordion = ({ items = [], type = 'single', defaultIndex = null }) => {
	const defaultValue = (() => {
		if (defaultIndex == null) return undefined
		if (Array.isArray(defaultIndex)) return defaultIndex.map((i) => `item-${i}`)
		return [`item-${defaultIndex}`]
	})()

	return (
		<Accordion type={type} defaultValue={defaultValue} className="w-full">
			{items.map((it, idx) => {
				const value = `item-${idx}`
				const title = it.title || `Note ${idx + 1}`
				const content = it.content || ''

				return (
					<AccordionItem key={value} value={value}>
						<AccordionTrigger>{title}</AccordionTrigger>
						<AccordionContent>
							<div className="text-sm text-muted-foreground whitespace-pre-line">{content}</div>
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default NoteAccordion
