import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldSelect = ({
	form,
	name,
	label,
	placeholder = 'Please choose',
	items = [],
	loading = false,
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

					<Select value={field.state.value ?? ''} onValueChange={field.handleChange}>
						<SelectTrigger className={field.state.value ? highlight : ''}><SelectValue placeholder={placeholder} /></SelectTrigger>

						<SelectContent className="max-w-[var(--radix-select-trigger-width)]">
							{loading && (<SelectItem value="loading" disabled>Loading...</SelectItem>)}
							{!loading && items.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}
						</SelectContent>
					</Select>
				</Field>
			)}
		/>
	)
}

export default FormFieldSelect