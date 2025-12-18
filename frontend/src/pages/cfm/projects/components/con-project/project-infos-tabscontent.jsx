import { useQuery } from '@tanstack/react-query'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import ContactCard from '@/components/ui-x/contact-card'
import NoteAccordion from '@/components/ui-x/note-accordion'
import { cn } from '@/lib/utils'

import { cfm_api } from '@/services/api'
import { fmt_date } from '@/lib/helpers'

const styles = {
	container: 'flex flex-col sm:flex-row gap-4 pb-8 w-full sm:w-[1180px]',
	card: 'flex flex-col sm:w-1/3 bg-neutral-900/50 rounded-md p-4'
}

//#region COMPONENT
const ProjectInfosTabsContent = ({ value, data }) => {
	const { get_some_contacts } = cfm_api()
	const { t } = useTranslation()

	const { data: contactsData } = useQuery({
		queryKey: ['some-contacts', data?.contact_ids],
		queryFn: () => get_some_contacts(data.contact_ids.split(',').map(Number)),
		select: res => res.data
	})

	const accordion_items = [
		[
			{ title: 'Important', content: data?.important_notes },
			{ title: 'Customer Commitments', content: data?.customer_commitments },
			{ title: 'Acceptance Conditions', content: data?.acceptance_conditions }
		],
		[
			{ title: 'Current Status', content: data?.current_status },
			{ title: 'Challenges', content: data?.challenges },
			{ title: 'Solutions', content: data?.solutions }
		]
	]

	return (
		<TabsContent value={value}>
			<section className="flex flex-col items-center">
				<div className={styles.container}>
					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Project Name" valueClass="truncate"
							value={data?.project_name}
						/>
						<LabelValue label="Stage" value={data?.stage_text} vTag={true} />
						<LabelValue label="Responsible" value={data?.responsible} />
						<LabelValue label="Participant" value={'-'} />

						<NoteAccordion items={accordion_items[1]} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Code" value={data?.project_id} vTag={true} />
						<LabelValue label="Stage Deadline" value={'-'} />
						<LabelValue label="Handover Deadline" value={fmt_date(data?.handover_deadline)} />
						<LabelValue label="Warranty Expiration Date" value={fmt_date(data?.warranty_expiration_date)} />
					</div>

					<div className={cn(styles.card, 'gap-8')}>
						<LabelValue label="Company" value={data?.company_name} />

						<div className="flex flex-col gap-4">
							{
								contactsData?.length
								&& (
									<div className="flex flex-col sm:flex-row gap-4 sm:w-fit">
										{
											contactsData?.map((item, k) =>
												<ContactCard key={k} name={item.contact_name} role={item.position} email={item.emails} phone={item.phones} />
											)
										}
									</div>
								)
							}

							<div className="flex flex-col w-full">
								<NoteAccordion items={accordion_items[0]} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</TabsContent>
	)
}

export default ProjectInfosTabsContent