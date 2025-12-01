import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm, useStore } from '@tanstack/react-form'
import { z } from 'zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import { FieldGroup, } from '@/components/ui/field'
import FormFieldSelect from '@/components/ui-x/form-field-select'
import FormFieldInput from '@/components/ui-x/form-field-input'

import { cfm_api } from '@/services/api'

const ProjectFormSheet = ({ open = false, onOpenChange }) => {
	const { get_spa_cons } = cfm_api()
	const { data: consData = [], isLoading } = useQuery({ queryKey: ['spa_con_projects'], queryFn: get_spa_cons, select: res => res.data, enabled: true })

	const formSchema = z.object({
		funding_source: z.string().min(1),
		contract_name: z.string().min(1),
		contract_code: z.string().min(1),
		contract_status: z.string().min(1),
	})

	const form = useForm({
		defaultValues: {},
		validators: {
			onSubmit: formSchema
		},
		onSubmit: ({ value }) => {
			console.log(value)
		}
	})

	const selected_project_id = useStore(form.store, s => s.values.project);
	const selected_project = consData.find(p => String(p.Id) === selected_project_id);
	const company_items = selected_project ? [{ value: String(selected_project.CompanyId), label: selected_project.CompanyName }] : []

	useEffect(() => {
		form.reset()
	}, [open])

	useEffect(() => {
		form.setFieldValue('company', '')

		if (company_items.length === 1) {
			form.setFieldValue('company', company_items[0].value)
		}
	}, [selected_project_id])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				aria-describedby={undefined}
				className="min-w-full sm:min-w-1/3"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<SheetHeader className="p-4 py-4 pb-2">
					<SheetTitle className="text-stone-700">Project Form</SheetTitle>
				</SheetHeader>

				<form className="px-4">
					<FieldGroup className="gap-4">

						<FormFieldSelect form={form} name="project" label="Project"
							items={consData.map(item => ({ value: String(item.Id), label: item.Title })) ?? []}
						/>

						<FormFieldSelect form={form} name="company" label="Company"
							items={company_items}
						/>

						<FormFieldSelect form={form} name="funding_source" label="Funding Source"
							items={[
								{ label: 'Tư nhân', value: 'TN' },
								{ label: 'Nhà nước - Đã cấp vốn', value: 'NN-D' }
							]}
						/>

						<FormFieldInput form={form} name="contract_name" label="Contract Name" />
						<FormFieldInput form={form} name="contract_code" label="Contract Code" />
						<FormFieldSelect form={form} name="contract_status" label="Contract Status"
							items={[
								{ label: 'Đã Ký', value: 'K' },
								{ label: 'Thanh Lý', value: 'TL' },
								{ label: 'Hủy', value: 'H' },
							]}
						/>

					</FieldGroup>
				</form>

				<div className="p-4">
					<Button size="sm" title="Submit" onClick={form.handleSubmit}>Submit</Button>
				</div>

			</SheetContent>
		</Sheet>
	)
}

export default ProjectFormSheet