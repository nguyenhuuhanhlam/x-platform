import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { IconCheck, IconBolt } from '@tabler/icons-react'

import ConfirmButton from '@/components/ui-x/confirm-button'
import FormFieldInput from '@/components/ui-x/form-field-input'
import FormFieldDate from '@/components/ui-x/form-field-date'
import FormFieldCheckbox from '@/components/ui-x/form-field-checkbox'
import FormFieldRadioGroup from '@/components/ui-x/form-field-radio-group'
import SeparatorWithText from '@/components/ui-x/separator-with-text'

const formSchema = z.object({
	lastname: z.string().min(1),
	firstname: z.string().min(1),
})

//#region COMPONENT
const FamilyFormDialog = ({ open, onOpenChange, mode = 'new', data }) => {

	const form = useForm({
		validators: {
			onSubmit: formSchema
		},
		onSubmit: (e) => {
			console.log(e.value)
		}
	})

	useEffect(() => {
		if (data && open) {
			form.reset({ ...data })
		}
	}, [data])

	//#region RENDER
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="flex flex-col sm:max-w-sm bg-gray-900 p-4 max-h-[667px]"
				aria-describedby={undefined}
				onOpenAutoFocus={(e) => {
					e.preventDefault()
					e.currentTarget.focus()
				}}
			>
				<DialogHeader>
					<DialogTitle className="text-stone-600">Family Editor</DialogTitle>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto m-scroll pb-4 pr-1">
					<FieldGroup className="gap-4">
						<FormFieldInput form={form} name="lastname" label="Last Name" />
						<FormFieldInput form={form} name="firstname" label="First Name" />
						<FormFieldDate form={form} name="dob" label="Birthday" />

						<FormFieldRadioGroup
							form={form}
							name="gender"
							label="Gender"
							items={[
								{ label: 'Male', value: 'male' },
								{ label: 'Female', value: 'female' },
							]}
						/>

						<FormFieldInput form={form} name="relationship" label="Relationship" />
						<FormFieldInput form={form} name="phone" label="Phone" />

						<SeparatorWithText><IconBolt size={16} /></SeparatorWithText>

						<div className="flex flex-col sm:flex-row gap-4">
							<FormFieldCheckbox form={form} name="is_dependent" label="Dependent" />
							<FormFieldCheckbox form={form} name="is_emergency" label="Emergency" />
						</div>

					</FieldGroup>
				</div>

				<DialogFooter>
					<div className="w-full flex justify-center gap-4">
						<Button size="sm" variant="outline"
							onClick={form.handleSubmit}
						>
							<IconCheck size={14} className="text-green-800" /> Update
						</Button>

						<ConfirmButton callback={() => { }} />
					</div>
				</DialogFooter>

			</DialogContent>
		</Dialog>
	)
}

export default FamilyFormDialog

/**
 * lưu ý:
 * + loại khoảng trắng ở số phone khi submit
 */