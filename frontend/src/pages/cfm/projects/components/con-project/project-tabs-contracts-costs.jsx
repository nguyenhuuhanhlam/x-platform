import { useQuery } from '@tanstack/react-query'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import LabelValue from '@/components/ui-x/label-value'
import { cn } from '@/lib/utils'

import { FUNDING_SOURCE } from '@/constants'
import { cfm_api } from '@/services/api'
import { fmt_date } from '@/lib/helpers'
import { styles } from './config'


const ProjectTabsContractsCosts = ({ value, data }) => {
	const { get_con_project_details, get_some_contacts } = cfm_api()
	const { t } = useTranslation()
	const funding = FUNDING_SOURCE[data?.funding_source]

	return (
		<TabsContent value={value}>
			<section className="flex flex-col items-center">
				<div className={styles.container}>
					<div className={cn(styles.card, 'gap-2')}>
						<LabelValue label="Contract Name" valueClass="truncate"
							value={data?.contract_name || '-'}
						/>

						<LabelValue label="Contract Code" value={data?.contract_code || '-'} />
						<LabelValue label="Funding Source"
							value={funding.text}
							vTag={true}
							tagClass={funding.tagClass}
						/>
						<LabelValue label="Contract Status" value={data?.contract_status || '-'} />
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						P2
					</div>

					<div className={cn(styles.card, 'gap-2')}>
						P3
					</div>
				</div>
			</section>
		</TabsContent>
	)
}

export default ProjectTabsContractsCosts