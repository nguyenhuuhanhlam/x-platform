import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldInput = ({
	form,
	name,
	label,
	placeholder = '',
	type = 'text',
	highlight = 'bg-blue-900/30!'
}) => {
	return (
		<form.Field
			name={name}
			children={(field) => (
				<Field className="gap-2">
					{
						label
						&& <FieldLabel className="flex justify-between field-label">
							{label}
							{field.state.meta.errors.length > 0 && (
								<IconPointFilled size={14} className="text-red-800 translate-y-[2px]" />
							)}
						</FieldLabel>
					}

					<Input
						className={field.state.value ? highlight : ''}
						type={type}
						placeholder={placeholder}
						value={field.state.value ?? ''}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
					/>
				</Field>
			)}
		/>
	)
}

export default FormFieldInput