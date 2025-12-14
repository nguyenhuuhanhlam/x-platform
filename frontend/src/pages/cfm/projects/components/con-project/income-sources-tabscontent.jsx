import { useTranslation } from 'react-i18next'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui-x/data-table'
import { IconPlus } from '@tabler/icons-react'

import { income_columns } from './config'
import MOCK_DATA from '@/test/income-sources.json'

const IncomeSourcesTabsContent = ({ value, data }) => {
	const { t } = useTranslation()

	return (
		<TabsContent value={value}>
			<section className="flex flex-col items-center">
				<div className="w-full flex justify-end my-2">
					<Button
						variant="outline" size="icon" className="m-sm-add-button"
					>
						<IconPlus />
					</Button>
				</div>

				<div className="flex flex-col">
					<DataTable columns={income_columns(t)} data={MOCK_DATA.data} />
				</div>
			</section>
		</TabsContent>
	)
}

export default IncomeSourcesTabsContent