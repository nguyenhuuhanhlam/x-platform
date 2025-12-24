import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IconPointFilled } from '@tabler/icons-react'

const formatNumber = (val) => {
	if (val === null || val === '' || isNaN(val)) return ''
	return Number(val).toLocaleString('de-DE')
}

const FormFieldNumber = ({
	form, name, label,
	min, max,
	highlight = 'bg-blue-900/30!'
}) => {

	return (
		<form.Field
			name={name}
			children={(field) => {
				const rawValue = field.state.value

				return (
					<Field className="gap-2">
						{label && (
							<FieldLabel className="flex justify-between field-label">
								{label}
								{field.state.meta.errors.length > 0 && (
									<IconPointFilled size={14} className="text-red-800 translate-y-0.5" />
								)}
							</FieldLabel>
						)}

						<Input
							className={rawValue ? highlight : ""}
							type="text"
							inputMode="numeric"
							value={formatNumber(rawValue)}
							onChange={(e) => {
								const val = e.target.value

								// Cho phép rỗng
								if (val.trim() === '') {
									field.handleChange(null)
									return
								}

								// Xóa dấu . khi parse
								const numeric = val.replace(/\./g, '')

								// Chỉ cho phép số
								if (!/^\d+$/.test(numeric)) return

								const n = Number(numeric)

								// min/max
								if (min !== undefined && n < min) return
								if (max !== undefined && n > max) return

								field.handleChange(n)
							}}
						/>
					</Field>
				)
			}}
		/>
	)
}

export default FormFieldNumber
