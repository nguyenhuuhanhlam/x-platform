import { useEffect } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'


const EmployeeDetailsDrawer = ({ open, onOpenChange, data }) => {

	useEffect(() => {
		if (open) {
			console.log(data)
		}
	}, [open])

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="min-h-2/3">

				<DrawerHeader>
					<DrawerTitle>{data.lastname} {data.firstname}</DrawerTitle>
					<DrawerDescription><span className="text-amber-200">{data.department}</span> • {data.position}</DrawerDescription>
				</DrawerHeader>

				<Tabs>
					<div className="flex justify-center w-full px-4 sm:px-0">
						<TabsList className="flex justify-start overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
							<TabsTrigger value="personal">Personal</TabsTrigger>
							<TabsTrigger value="work.infos">Work-Infos</TabsTrigger>
							<TabsTrigger value="workdays">Workdays</TabsTrigger>
							<TabsTrigger value="salary">Salary</TabsTrigger>
							<TabsTrigger value="career.path">Career-Path</TabsTrigger>
							<TabsTrigger value="documents">Documents</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="personal" className="px-4">Personal Content</TabsContent>
				</Tabs>

			</DrawerContent>
		</Drawer>
	)
}

export default EmployeeDetailsDrawer