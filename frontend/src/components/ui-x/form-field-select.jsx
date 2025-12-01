import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldSelect = ({
	form,
	name,
	label,
	placeholder = "---",
	items = [],
	loading = false,
}) => {
	return (
		<form.Field
			name={name}
			children={(field) => (
				<Field>
					{
						label
						&& <FieldLabel>
							{label}
							{field.state.meta.errors.length > 0 && (
								<IconPointFilled size={14} className="text-red-800 translate-y-[2px]" />
							)}
						</FieldLabel>
					}

					<Select value={field.state.value ?? ''} onValueChange={field.handleChange}>
						<SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>

						<SelectContent>
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