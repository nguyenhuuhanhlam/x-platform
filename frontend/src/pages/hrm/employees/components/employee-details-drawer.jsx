import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, } from '@/components/ui/drawer'
import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { IconSettings } from '@tabler/icons-react'

import PersonalTabsContent from './personal-tabs-content'
import WorkInfosTabsContent from './workinfos-tabs-content'

const EmployeeDetailsDrawer = ({ open, onOpenChange, data }) => {

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="h-full flex flex-col p-0">

				<Tabs defaultValue="personal" className="flex flex-col h-full">
					<DrawerHeader>
						<DrawerTitle> {data.lastname} {data.firstname} </DrawerTitle>
						<DrawerDescription> <span className="text-amber-200">{data.department}</span> • {data.position} </DrawerDescription>
					</DrawerHeader>

					<div className="flex justify-center w-full px-4 sm:px-0">
						<TabsList className="flex justify-start overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
							<TabsTrigger value="personal">Personal</TabsTrigger>
							<TabsTrigger value="work.infos">Work-Infos</TabsTrigger>
							<TabsTrigger value="workdays">Workdays</TabsTrigger>
							<TabsTrigger value="salary">Salary</TabsTrigger>
							<TabsTrigger value="career.path">Career-Path</TabsTrigger>
							<TabsTrigger value="documents">Documents</TabsTrigger>
							<TabsTrigger value="settings"><IconSettings size={14}/>Settings</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
						<PersonalTabsContent value="personal" data={data} />
						<WorkInfosTabsContent value="work.infos" data={data} />
					</div>

				</Tabs>
			</DrawerContent>
		</Drawer>
	)
}

export default EmployeeDetailsDrawer