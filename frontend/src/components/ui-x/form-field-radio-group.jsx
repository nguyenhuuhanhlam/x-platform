import { Field, FieldLabel } from '@/components/ui/field'
import {
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/radio-group'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldRadioGroup = ({
	form,
	name,
	label,
	items = [],
	highlight = 'bg-blue-900/30!'
}) => {
	return (
		<form.Field
			name={name}
			children={(field) => {
				const value = field.state.value

				return (
					<Field className="gap-2">
						{/* Label */}
						{label && (
							<FieldLabel className="flex justify-between field-label">
								{label}
								{field.state.meta.errors.length > 0 && (
									<IconPointFilled
										size={14}
										className="text-red-800 translate-y-0.5"
									/>
								)}
							</FieldLabel>
						)}

						<div className={`flex items-center gap-3 rounded-md border p-3 ${value ? highlight : ''}`} >
							<RadioGroup
								value={value}
								onValueChange={field.handleChange}
								className="flex flex-col"
							>
								{items.map((item) => (
									<label
										key={item.value}
										className="flex items-center gap-3 cursor-pointer select-none"
									>
										<RadioGroupItem
											value={item.value}
											className="h-4 w-4"
										/>
										<span className="text-sm leading-none">
											{item.label}
										</span>
									</label>
								))}
							</RadioGroup>
						</div>

					</Field>
				)
			}}
		/>
	)
}

export default FormFieldRadioGroup
