import { Field, FieldLabel } from "@/components/ui/field"
import { IconPointFilled, IconX } from "@tabler/icons-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import dayjs from "dayjs"

const FormFieldDate = ({
	form,
	name,
	label,
	placeholder = "Select date",
	displayFormat = 'DD-MM-YYYY',
	highlight = 'bg-blue-900/30!'
}) => {
	return (
		<form.Field
			name={name}
			children={(field) => {
				const rawValue = field.state.value
				const value = rawValue ? dayjs(rawValue) : null
				const calendarValue = value ? value.toDate() : undefined

				return (
					<Field className="gap-2">
						{label && (
							<FieldLabel className="flex justify-between field-label">
								{label}
								{field.state.meta.errors.length > 0 && (
									<IconPointFilled
										size={14}
										className="text-red-800 translate-y-[2px]"
									/>
								)}
							</FieldLabel>
						)}

						<div className="flex items-center gap-2">
							{/* Date Picker */}
							<Popover>
								<PopoverTrigger className={field.state.value ? highlight : ''} asChild>
									<Button
										variant="outline"
										className={`flex-1 justify-start text-left font-normal ${!value ? 'text-muted-foreground' : ''}`}
									>
										{value ? value.format(displayFormat) : placeholder}
									</Button>
								</PopoverTrigger>

								<PopoverContent className="p-0">
									<Calendar
										mode="single"
										selected={calendarValue}
										onSelect={(date) => {
											if (!date) {
												field.handleChange('')
												return
											}
											field.handleChange(dayjs(date).toISOString())
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							{/* Clear button */}
							{value && (
								<Button
									type="button"
									variant="secondary"
									size="icon"
									className="h-9 w-9"
									onClick={() => field.handleChange(null)}
								>
									<IconX size={16} className="text-muted-foreground" />
								</Button>
							)}
						</div>
					</Field>
				)
			}}
		/>
	)
}

export default FormFieldDate
