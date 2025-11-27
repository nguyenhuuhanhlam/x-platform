import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs'

import CONTabsContent from './components/con-tabs-content'

const CFMProjectsPage = () => {
	return (
		<div className="p-4">
			<Tabs defaultValue="con">
				<TabsList>
					<TabsTrigger value="con">CON</TabsTrigger>
					<TabsTrigger value="eia">EIA</TabsTrigger>
					<TabsTrigger value="et">ET</TabsTrigger>
				</TabsList>

				<CONTabsContent value="con" />
			</Tabs>
		</div>
	)
}

export default CFMProjectsPage