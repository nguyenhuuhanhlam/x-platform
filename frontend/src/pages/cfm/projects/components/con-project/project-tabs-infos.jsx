import { useQuery } from '@tanstack/react-query'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import ContactCard from '@/components/ui-x/contact-card'
import NoteAccordion from '@/components/ui-x/note-accordion'
import { cfm_api } from '@/services/api'


const ProjectTabsInfos = ({ value, data }) => {
	const { get_detail_con_project, get_contacts } = cfm_api()
	const { t } = useTranslation()

	const { data: _data } = useQuery({
		queryKey: ['con-details', data.id],
		queryFn: () => get_detail_con_project(data.project_id),
		select: res => res.data[0],
		enabled: true
	})

	const { data: contactsData } = useQuery({
		queryKey: ['some_contacts', _data?.contact_ids],
		queryFn: () => get_contacts(_data.contact_ids.split(',').map(Number)),
		select: res => res.data
	})

	return (
		<TabsContent value={value}>
			<div className="flex flex-col sm:flex-row gap-8">
				<div className="flex flex-col gap-2 min-w-[250px]">
					<LabelValue label="Project Name" value={_data?.project_name} valueClass="truncate" />
					<LabelValue label="Company" value={_data?.company_name} />
					<LabelValue label="Stage Deadline" value={'-'} />
					<LabelValue label="Stage" value={_data?.stage_text} vTag={true} />
				</div>

				<div className="flex flex-col gap-2 min-w-[160px]">
					<LabelValue label="Code" value={_data?.project_id} vTag={true} />
					<LabelValue label="Responsible" value={_data?.responsible} />
				</div>

				<div className="flex flex-col gap-4">
					<div className="text-sm font-bold text-stone-500">Contacts</div>
					<div className="flex flex-col sm:flex-row gap-4">
						{
							contactsData?.map((item, k) =>
								<ContactCard key={k} name={item.contact_name} role={item.position} email={item.emails} phone={item.phones} />
							)
						}
					</div>

					<div className="flex flex-col mt-4 gap-2">
						<div className="text-sm font-bold text-stone-500">Notes</div>
						<NoteAccordion items={[{ title: 'A', content: 'AAA' }, { title: 'B', content: 'BBB' }]} />
					</div>
				</div>
			</div>
		</TabsContent>
	)
}

export default ProjectTabsInfos