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
	displayFormat = "DD-MM-YYYY",
	highlight = "bg-blue-900/30!",
	disabled = false,
	readonly = false,
}) => {
	const isLocked = disabled || readonly // dùng chung check lock UI

	return (
		<form.Field
			name={name}
			children={(field) => {
				const rawValue = field.state.value
				const value = rawValue ? dayjs(rawValue) : null
				const calendarValue = value ? value.toDate() : undefined

				return (
					<Field className="gap-2">

						{/* LABEL (mờ khi disabled + readonly) */}
						{label && (
							<FieldLabel
								className={`flex justify-between field-label ${disabled || readonly ? "opacity-60" : ""
									}`}
							>
								{label}

								{/* Error icon — hiện khi không locked */}
								{field.state.meta.errors.length > 0 && !isLocked && (
									<IconPointFilled
										size={14}
										className="text-red-800 translate-y-[2px]"
									/>
								)}
							</FieldLabel>
						)}

						<div
							className={`flex items-center gap-2 ${disabled ? "cursor-not-allowed" : ""
								}`}
						>

							{/* DATE PICKER */}
							<Popover>
								<PopoverTrigger
									className={value && !disabled ? highlight : ""}
									asChild
									disabled={disabled}
								>
									<Button
										variant="outline"
										disabled={disabled}
										className={`flex-1 justify-start text-left font-normal ${!value ? "text-muted-foreground" : ""
											}`}
									>
										{value ? value.format(displayFormat) : placeholder}
									</Button>
								</PopoverTrigger>

								{/* Disabled thì không render calendar */}
								{!disabled && (
									<PopoverContent className="p-0">
										<Calendar
											mode="single"
											selected={calendarValue}
											// READONLY MODE — KHÔNG CHO CHỌN
											onSelect={(date) => {
												if (readonly) return
												if (!date) {
													field.handleChange("")
													return
												}

												// ⭐ Format YYYY-MM-DD
												field.handleChange(
													dayjs(date).format("YYYY-MM-DD")
												)
											}}
											// Khóa selectable khi readonly
											disabled={readonly}
											initialFocus
										/>
									</PopoverContent>
								)}
							</Popover>

							{/* CLEAR BUTTON — chỉ hiện khi không locked */}
							{value && !isLocked && (
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
