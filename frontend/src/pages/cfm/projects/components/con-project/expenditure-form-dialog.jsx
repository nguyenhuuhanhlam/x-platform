import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { FieldGroup, } from '@/components/ui/field'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconCheck, IconInfoCircleFilled } from '@tabler/icons-react'

import ConfirmButton from '@/components/ui-x/confirm-button'
import FormFieldSelect from '@/components/ui-x/form-field-select'
import FormFieldInput from '@/components/ui-x/form-field-input'
import FormFieldDate from '@/components/ui-x/form-field-date'
import FormFieldNumber from '@/components/ui-x/form-field-number'

import { cfm_api } from '@/services/api'
import { EXPENDITURE_TYPES } from '@/constants'

const ExpenditureFormDialog = ({ open, onOpenChange, data }) => {
	// const { post_con_expenditure, delete_con_expenditure } = cfm_api()
	const queryClient = useQueryClient()

	const form = useForm({
		onSubmit: (e) => {
			mutation.mutate(e.value)
		}
	})

	useEffect(() => {
		if (data && open) {
			form.reset({ ...data })
		}
	}, [data, open])

	const mutation = useMutation({
		mutationFn: cfm_api().post_con_expenditure,
		onSuccess: () => {
			queryClient.invalidateQueries(['con-expenditures'])
			onOpenChange(false)
		},
		onError: () => {
			console.log('Failed to update expenditure source')
		}
	})

	const delete_mutation = useMutation({
		mutationFn: (id) => cfm_api().delete_con_expenditure(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['con-expenditures'])
			onOpenChange(false)
		},
		onError: () => {
			console.log('Failed to delete expenditure source')
		}
	})

	const handleDelete = () => {
		delete_mutation.mutate(data.id)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="sm:max-w-sm bg-gray-900 p-4"
				aria-describedby={undefined}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className="text-stone-600">Expenditure Editor</DialogTitle>
				</DialogHeader>

				<FieldGroup className="gap-4">
					<FormFieldInput form={form} name="title" label="Title" />

					<div className="grid grid-cols-2 gap-4">
						<FormFieldNumber form={form} name="amount" label="Amount" />
						<FormFieldNumber form={form} name="amount_vat"
							label={<><span>Amount</span><IconInfoCircleFilled size={18} title="VAT" className="text-violet-700" /></>}
							highlight="bg-violet-900/30!"
						/>
					</div>

					<FormFieldDate form={form} name="payment_received_date" label="Received Date" />

					<div className="grid grid-cols-2 gap-4">
						<FormFieldSelect form={form} name="type" label="Type"
							items={
								Object.entries(EXPENDITURE_TYPES).map(([k, v]) => ({ label: v.text, value: k }))
							}
						/>

						<FormFieldSelect form={form} name="status" label="Status"
							items={[
								{ value: 'KH', label: 'Kế hoạch' },
								{ value: 'HT', label: 'Hoàn thành' }
							]}
						/>
					</div>
				</FieldGroup>

				<DialogFooter>
					<div className="w-full flex justify-center gap-4">
						<Button size="sm" variant="outline"
							onClick={form.handleSubmit}
						>
							<IconCheck size={14} className="text-green-800" /> Update
						</Button>

						<ConfirmButton callback={handleDelete} />
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ExpenditureFormDialog