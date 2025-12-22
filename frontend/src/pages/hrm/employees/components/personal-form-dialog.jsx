import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

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

const PersonalFormDialog = ({ open, onOpenChange, data }) => {
	const form = useForm({})
	const { t } = useTranslation()

	useEffect(() => {
		if (data) {
			form.reset({ ...data })
		}
	}, [data])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="flex flex-col sm:max-w-sm bg-stone-900 p-4 max-h-[667px]"
				aria-describedby={undefined}
				onOpenAutoFocus={(e) => {
					e.preventDefault()
					e.currentTarget.focus()
				}}
			>
				<DialogHeader>
					<DialogTitle className="text-stone-600">Personal Editor</DialogTitle>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto m-scroll pb-4 pr-1">
					<FieldGroup className="gap-4">
						<FormFieldInput form={form} name="lastname" label={t('lastname')} />
						<FormFieldInput form={form} name="firstname" label={t('firstname')} />
						<FormFieldInput form={form} name="email" label={t('email')} />
						<FormFieldInput form={form} name="phone" label="Phone" />
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

export default PersonalFormDialog