import { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'

import FormFieldSelect from '@/components/ui-x/form-field-select'
import FormFieldInput from '@/components/ui-x/form-field-input'
import FormFieldDate from '@/components/ui-x/form-field-date'
import FormFieldNumber from '@/components/ui-x/form-field-number'
import SeparatorWithText from '@/components/ui-x/separator-with-text'

const EmployeeFormSheet = ({
	open = false,
	onOpenChange
}) => {

	const { t } = useTranslation()
	const form = useForm({})

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				className="min-w-full sm:min-w-1/4"
				aria-describedby={undefined}
			>
				<SheetHeader className="p-4 py-4 pb-2">
					<SheetTitle className="text-stone-700">Employee Form</SheetTitle>
				</SheetHeader>

				<FieldGroup className="px-4 gap-4">
					<FormFieldInput form={form} name="lastname" label={t('lastname')} />
					<FormFieldInput form={form} name="firstname" label={t('firstname')} />
				</FieldGroup>

			</SheetContent>
		</Sheet>
	)
}

export default EmployeeFormSheet