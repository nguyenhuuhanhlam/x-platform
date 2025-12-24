import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useStore } from '@tanstack/react-form'
import dayjs from 'dayjs'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { IconCircleNumber2Filled, IconCircleNumber3Filled, IconCircleNumber4Filled, IconHelpCircleFilled, IconInfoCircleFilled } from '@tabler/icons-react'
import { FieldGroup } from '@/components/ui/field'

import FormFieldSelect from '@/components/ui-x/form-field-select'
import FormFieldInput from '@/components/ui-x/form-field-input'
import FormFieldDate from '@/components/ui-x/form-field-date'
import FormFieldNumber from '@/components/ui-x/form-field-number'
import SeparatorWithText from '@/components/ui-x/separator-with-text'

import { cfm_api } from '@/services/api'
import { form_schema } from './config'

//#region COMPONENT
const ProjectFormSheet = ({
	open = false,
	mode = 'new',
	onOpenChange,
	data,
	callback = (e) => { }
}) => {
	const { get_spa_cons, post_con_project } = cfm_api()
	const queryClient = useQueryClient()

	const { data: consData = [], isLoading } = useQuery({
		queryKey: ['spa-con-projects'],
		queryFn: get_spa_cons,
		select: res => res.data,
		enabled: open === true
	})

	const form = useForm({
		validators: {
			onSubmit: form_schema
		},
		onSubmit: ({ value }) => {
			if (mode === 'new') {
				const payload = { ...value, project_name: selected_project.Title }
				mutation.mutate(payload)
			} else {
				const { company_name, stage_text, responsible_name, ...payload } = value
				mutation.mutate(payload)
			}
		}
	})

	// Watch fields
	const { signed_date, effective_days } = useStore(form.store, s => ({
		signed_date: s.values.signed_date,
		effective_days: s.values.effective_days,
	}))

	const mutation = useMutation({
		mutationFn: post_con_project,
		onSuccess: (e, form_values) => {
			queryClient.invalidateQueries(['spa-con-projects'])

			if (mode === 'new') {
				toast.success('Your data has been created.')
			} else {
				toast.info('Your data has been updated.')
				callback(form_values)
			}

			onOpenChange(false)
		},
		onError: (e) => {
			toast.error(e)
		}
	})

	const selected_project_id = useStore(form.store, s => s.values.project_id)
	const selected_project = consData.find(p => String(p.Id) === selected_project_id)
	const company_items = selected_project ? [{ value: String(selected_project.CompanyId), label: selected_project.CompanyName }] : []
	const stage_items = selected_project ? [{ value: String(selected_project.stageValue), label: selected_project.stageText }] : []
	const responsible_items = selected_project ? [{ value: String(selected_project.responsible_id), label: selected_project.responsible }] : []

	useEffect(() => {
		if (open === false) return

		if (mode === 'edit') {
			form.reset(data)

			form.setFieldValue('project_id', String(data.project_id))
			form.setFieldValue('company_id', String(data.company_id))
			form.setFieldValue('sales_objects', String(data.sales_objects))
			form.setFieldValue('funding_source', String(data.funding_source))
			form.setFieldValue('responsible_id', String(data.responsible_id))

		} else if (mode === 'new') {
			form.reset()
		}

	}, [open])

	useEffect(() => {
		if (company_items.length === 1) { form.setFieldValue('company_id', company_items[0].value) }
		if (stage_items.length === 1) { form.setFieldValue('stage', stage_items[0].value) }
		if (responsible_items.length === 1) { form.setFieldValue('responsible_id', responsible_items[0].value) }
	}, [selected_project_id])

	useEffect(() => { // Calculate expiry_date
		if (!signed_date || !effective_days) {
			form.setFieldValue("expiry_date", null)
			return
		}

		const newDate = dayjs(signed_date)
			.add(Number(effective_days), "day")
			.toISOString()

		form.setFieldValue("expiry_date", newDate)
	}, [signed_date, effective_days])


	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				aria-describedby={undefined}
				className="min-w-full sm:min-w-1/3 p-0 flex flex-col"
			// onInteractOutside={(e) => e.preventDefault()}
			>
				<SheetHeader className="p-4 py-4 pb-2">
					<SheetTitle className="text-stone-700">Project Form</SheetTitle>
				</SheetHeader>

				<div className="flex-1 px-4 pb-6 m-scroll overflow-y-scroll">
					<form className="px-4">
						<FieldGroup className="gap-4">

							<FormFieldSelect form={form} name="project_id" label="Project"
								showSearch={true}
								items={
									mode === 'edit'
										? [{ value: String(data.project_id), label: data.project_name }]
										: consData.map(item => ({ value: String(item.Id), label: item.Title })) ?? []
								}
							/>

							<FormFieldSelect form={form} name="company_id" label="Company"
								items={
									mode === 'edit'
										? [{ value: String(data.company_id), label: data.company_name }]
										: company_items
								}
							/>

							<div className="grid grid-cols-2 gap-4">
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
							</div>


							<SeparatorWithText><IconCircleNumber2Filled /></SeparatorWithText>

							<FormFieldInput form={form} name="contract_name" label="Contract Name" />
							<FormFieldInput form={form} name="contract_code" label="Contract Code" />
							<FormFieldSelect form={form} name="contract_status" label="Contract Status"
								items={[
									{ label: 'Đã Ký', value: 'K' },
									{ label: 'Thanh Lý', value: 'TL' },
									{ label: 'Hủy', value: 'H' },
								]}
							/>

							<SeparatorWithText><IconCircleNumber3Filled /></SeparatorWithText>

							<div className="flex flex-col sm:flex-row gap-4">
								<FormFieldDate form={form} name="signed_date" label="Signed Date" />
								<FormFieldNumber form={form} name="effective_days" label="Effective" />
								<FormFieldDate form={form} name="expiry_date" label="Expiry Date" readonly={true} />
							</div>

							<FormFieldSelect form={form} name="stage" label="Stage"
								items={
									mode === 'edit'
										? [{ value: String(data.stage), label: data.stage_text }]
										: stage_items
								}
							/>

							<FormFieldSelect form={form} name="responsible_id" label="Responsible"
								items={
									mode === 'edit'
										? [{ value: String(data.responsible_id), label: data.responsible_name }]
										: responsible_items
								}
							/>

							<SeparatorWithText><IconCircleNumber4Filled /></SeparatorWithText>

							<div className="flex flex-col sm:flex-row gap-4">
								<FormFieldNumber form={form} name="contract_value" label="Contract Value" />
								<FormFieldNumber form={form} name="contract_value_vat"
									label={<><span>Contract Value</span><IconInfoCircleFilled size={18} title="VAT" className="text-violet-700" /></>}
									highlight="bg-violet-900/30!"
								/>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<FormFieldNumber form={form} name="total_original" label="Total Original" />
								<FormFieldNumber form={form} name="total_original_vat"
									label={<><span>Total Original</span><IconInfoCircleFilled size={18} title="VAT" className="text-violet-700" /></>} highlight="bg-violet-900/30!" />
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<FormFieldNumber form={form} name="total_planned" label="Total Planned" />
								<FormFieldNumber form={form} name="total_planned_vat"
									label={<><span>Total Planned</span><IconInfoCircleFilled size={18} title="VAT" className="text-violet-700" /></>} highlight="bg-violet-900/30!" />
							</div>

							<FormFieldNumber form={form} name="sales_cost" label="Sales Discount" />

						</FieldGroup>
					</form>
				</div>

				<div className="p-4 border-t bg-background sticky bottom-0">
					<Button size="sm" title="Submit" variant="outline"
						onClick={form.handleSubmit}
					>
						Submit
					</Button>
				</div>

			</SheetContent>
		</Sheet>
	)
}

export default ProjectFormSheet