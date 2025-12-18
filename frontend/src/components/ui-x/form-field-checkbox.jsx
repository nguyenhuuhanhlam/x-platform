import { Field } from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldCheckbox = ({
	form,
	name,
	label,
	highlight = 'bg-blue-900/30!'
}) => {
	return (
		<form.Field
			name={name}
			children={(field) => {
				const checked = Boolean(field.state.value)

				return (
					<Field className="gap-1">
						<div className={`flex items-center gap-3 rounded-md border h-9 px-3 ${checked ? highlight : ''}`} >
							<Checkbox
								checked={checked}
								onCheckedChange={(val) => {
									field.handleChange(val === true)
								}}
							/>

							<label
								className="flex items-center gap-1 text-sm cursor-pointer select-none"
								onClick={() => field.handleChange(!checked)}
							>
								{label}
								{field.state.meta.errors.length > 0 && (
									<IconPointFilled
										size={14}
										className="text-red-800 translate-y-px"
									/>
								)}
							</label>
						</div>
					</Field>
				)
			}}
		/>
	)
}

export default FormFieldCheckbox
