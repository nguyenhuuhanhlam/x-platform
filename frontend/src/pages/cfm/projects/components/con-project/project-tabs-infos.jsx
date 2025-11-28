import { useQuery } from '@tanstack/react-query'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import { cfm_api } from '@/services/api'

const ProjectTabsInfos = ({ value, data }) => {
	const { get_detail_con_project } = cfm_api()
	const { t } = useTranslation()

	const { data: projectDetailsData } = useQuery({
		queryKey: ['con-details', data.id],
		queryFn: () => get_detail_con_project(data.project_id),
		select: res => res.data[0],
		enabled: true
	})

	return (
		<TabsContent value={value}>
			<div className="flex flex-col sm:flex-row gap-8">
				<div className="flex flex-col gap-2 min-w-[250px]">
					<LabelValue label="Project Name" value={projectDetailsData.project_name} valueClass="truncate" />
					<LabelValue label="Company" value={projectDetailsData.company_name} />
					<LabelValue label="Stage Deadline" value={'-'} />
				</div>

				<div className="flex flex-col gap-2 min-w-[160px]">
					<LabelValue label="Code" value={projectDetailsData.project_id} />
					<LabelValue label="Responsible" value={projectDetailsData.responsible} />
				</div>
			</div>
		</TabsContent>
	)
}

export default ProjectTabsInfos