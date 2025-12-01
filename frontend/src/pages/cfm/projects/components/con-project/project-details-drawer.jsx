import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs'

import ProjectTabsInfos from './project-tabs-infos'

const ProjectDetailsDrawer = ({ open, onOpenChange, data }) => {
	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="h-[60vh] flex flex-col p-0" onInteractOutside={(e) => e.preventDefault()}>

				<Tabs defaultValue="information" className="flex flex-col h-full">
					<DrawerHeader className="mt-3 py-0">
						<DrawerTitle>{data.project_name}</DrawerTitle>
						<DrawerDescription> - </DrawerDescription>
					</DrawerHeader>

					<div className="flex justify-center w-full px-2 sm:px-0 py-2">
						<TabsList className="flex justify-start overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
							<TabsTrigger value="information">Information</TabsTrigger>
							<TabsTrigger value="contractscosts">Contracts - Costs</TabsTrigger>
							<TabsTrigger value="schedules">Schedules</TabsTrigger>
							<TabsTrigger value="documents">Documents</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
						<ProjectTabsInfos value="information" data={data} />
					</div>

				</Tabs>

			</DrawerContent>
		</Drawer>
	)
}

export default ProjectDetailsDrawer