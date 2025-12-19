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

const PersonalFormDialog = ({ open, onOpenChange }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="flex flex-col sm:max-w-sm bg-gray-900 p-4 max-h-[667px]"
				aria-describedby={undefined}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className="text-stone-600">Personal Editor</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default PersonalFormDialog