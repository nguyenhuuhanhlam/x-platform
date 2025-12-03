import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm, useStore } from '@tanstack/react-form'
// import { z } from 'zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import { FieldGroup, } from '@/components/ui/field'
import FormFieldSelect from '@/components/ui-x/form-field-select'
import FormFieldInput from '@/components/ui-x/form-field-input'
import FormFieldDate from '@/components/ui-x/form-field-date'
import FormFieldNumber from '@/components/ui-x/form-field-number'
import SeparatorWithText from '@/components/ui-x/separator-with-text'

import { cfm_api } from '@/services/api'
import { formSchema } from './config'

const ProjectFormSheet = ({ open = false, onOpenChange, data, mode = 'new' }) => {
	const { get_spa_cons } = cfm_api()

	const { data: consData = [], isLoading } = useQuery({
		queryKey: ['spa-con-projects'],
		queryFn: get_spa_cons,
		select: res => res.data,
		enabled: open === true
	})

	const form = useForm({
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			console.log(value)
		}
	})

	const selected_project_id = useStore(form.store, s => s.values.project)
	const selected_project = consData.find(p => String(p.Id) === selected_project_id)
	const company_items = selected_project ? [{ value: String(selected_project.CompanyId), label: selected_project.CompanyName }] : []
	const stage_items = selected_project ? [{ value: String(selected_project.stageValue), label: selected_project.stageText }] : []
	const responsible_items = selected_project ? [{ value: String(selected_project.responsible_id), label: selected_project.responsible }] : []

	useEffect(() => {
		if (open === false) return

		if (mode === 'edit') {

			// form.setFieldValue('project', String(data.project_id))
			// form.setFieldValue('company', String(data.company_id))

			// console.log('data from props:', data)
			form.reset(data)

		} else if (mode === 'new') {
			form.reset()
		}

	}, [open])

	useEffect(() => {
		// form.setFieldValue('company', '')
		// form.setFieldValue('stage', '')
		// form.setFieldValue('responsible', '')

		if (company_items.length === 1) { form.setFieldValue('company', company_items[0].value) }
		if (stage_items.length === 1) { form.setFieldValue('stage', stage_items[0].value) }
		if (responsible_items.length === 1) { form.setFieldValue('responsible', responsible_items[0].value) }

	}, [selected_project_id])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				aria-describedby={undefined}
				className="min-w-full sm:min-w-1/3 p-0 flex flex-col"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<SheetHeader className="p-4 py-4 pb-2">
					<SheetTitle className="text-stone-700">Project Form</SheetTitle>
				</SheetHeader>

				<div className="flex-1 px-4 pb-6 m-scroll overflow-y-scroll">
					<form className="px-4">
						<FieldGroup className="gap-4">

							<FormFieldSelect form={form} name="project" label="Project"
								items={
									mode === 'edit'
										? [{ value: String(data.project_id), label: data.project_name }]
										: consData.map(item => ({ value: String(item.Id), label: item.Title })) ?? []
								}
							/>

							<FormFieldSelect form={form} name="company" label="Company"
								items={
									mode === 'edit'
										? [{ value: String(data.company_id), label: data.company_name }]
										: company_items
								}
							/>

							<FormFieldSelect form={form} name="sales_objects" label="Sales Objects"
								items={[
									{ label: 'Tư nhân', value: '2' },
									{ label: 'Nhà nước', value: '1' }
								]}
							/>
							<FormFieldSelect form={form} name="funding_source" label="Funding Source"
								items={[
									{ label: 'Đã cấp vốn', value: '1' },
									{ label: 'Chưa cấp vốn', value: '0' }
								]}
							/>

							<SeparatorWithText>/</SeparatorWithText>

							<FormFieldInput form={form} name="contract_name" label="Contract Name" />
							<FormFieldInput form={form} name="contract_code" label="Contract Code" />
							<FormFieldSelect form={form} name="contract_status" label="Contract Status"
								items={[
									{ label: 'Đã Ký', value: 'K' },
									{ label: 'Thanh Lý', value: 'TL' },
									{ label: 'Hủy', value: 'H' },
								]}
							/>

							<SeparatorWithText>/</SeparatorWithText>

							<FormFieldDate form={form} name="signed_date" label="Signed Date" />
							<FormFieldDate form={form} name="expiry_date" label="Expiry Date" />

							<FormFieldNumber form={form} name="effective_days" label="Effective Days" />

							<FormFieldSelect form={form} name="stage" label="Stage" items={stage_items} />
							<FormFieldSelect form={form} name="responsible" label="Responsible" items={responsible_items} />

							<SeparatorWithText>/</SeparatorWithText>

							<FormFieldNumber form={form} name="contract_value_vat" label="Contract Value" />
							<FormFieldNumber form={form} name="total_original_vat" label="Total Original" />
							<FormFieldNumber form={form} name="sales_cost" label="Sales Discount" />
							<FormFieldNumber form={form} name="total_planned_vat" label="Total Planned VAT" />

						</FieldGroup>
					</form>
				</div>

				<div className="p-4 border-t bg-background sticky bottom-0">
					<Button size="sm" title="Submit" onClick={form.handleSubmit}>Submit</Button>
				</div>

			</SheetContent>
		</Sheet>
	)
}

export default ProjectFormSheet