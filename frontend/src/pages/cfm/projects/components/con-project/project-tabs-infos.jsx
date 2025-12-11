import { useQuery } from '@tanstack/react-query'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import ContactCard from '@/components/ui-x/contact-card'
import NoteAccordion from '@/components/ui-x/note-accordion'
import { cfm_api } from '@/services/api'
import { fmt_date } from '@/lib/helpers'

const ProjectTabsInfos = ({ value, data }) => {
	const { get_con_project_details, get_some_contacts } = cfm_api()
	const { t } = useTranslation()

	const { data: _data } = useQuery({
		queryKey: ['con-project-detail', data.id],
		queryFn: () => get_con_project_details(data.project_id),
		select: res => res.data[0],
		enabled: true
	})

	const { data: contactsData } = useQuery({
		queryKey: ['some-contacts', _data?.contact_ids],
		queryFn: () => get_some_contacts(_data.contact_ids.split(',').map(Number)),
		select: res => res.data
	})

	const note_items = [
		{ title: 'Important', content: _data?.important_notes },
		{ title: 'Customer Commitments', content: _data?.customer_commitments },
		{ title: 'Acceptance Conditions', content: _data?.acceptance_conditions }
	]

	const things_items = [
		{ title: 'Current Status', content: _data?.current_status },
		{ title: 'Challenges', content: _data?.challenges },
		{ title: 'Solutions', content: _data?.solutions }
	]

	return (
		<TabsContent value={value}>
			<div className="flex flex-col sm:flex-row gap-8 pb-8">
				<div className="flex flex-col gap-2 sm:min-w-[420px]">
					<LabelValue label="Project Name" value={_data?.project_name} valueClass="truncate" />
					<LabelValue label="Stage" value={_data?.stage_text} vTag={true} />
					<LabelValue label="Responsible" value={_data?.responsible} />
					<LabelValue label="Participant" value={'-'} />

					<NoteAccordion items={things_items} />
				</div>

				<div className="flex flex-col gap-2 sm:min-w-[260px]">
					<LabelValue label="Code" value={_data?.project_id} vTag={true} />
					<LabelValue label="Stage Deadline" value={'-'} />
					<LabelValue label="Handover Deadline" value={fmt_date(_data?.handover_deadline)} />
					<LabelValue label="Warranty Expiration Date" value={fmt_date(_data?.warranty_expiration_date)} />
				</div>

				<div className="flex flex-col gap-2 flex-1">
					<div className="w-fit"><LabelValue label="Company" value={_data?.company_name} /></div>
					<div className="text-sm font-bold text-amber-500/50">Contacts</div>
					<div className="flex flex-col sm:flex-row gap-4 sm:w-fit">
						{
							contactsData?.map((item, k) =>
								<ContactCard key={k} name={item.contact_name} role={item.position} email={item.emails} phone={item.phones} />
							)
						}
					</div>

					<div className="flex flex-col w-full sm:w-fit">
						<NoteAccordion items={note_items} />
					</div>
				</div>
			</div>
		</TabsContent>
	)
}

export default ProjectTabsInfos