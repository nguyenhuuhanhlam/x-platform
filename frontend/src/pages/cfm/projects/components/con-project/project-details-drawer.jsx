import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { IconEdit } from '@tabler/icons-react'
import { toast } from 'sonner'

import ProjectTabsInfos from './project-tabs-infos'
import ConfirmButton from '@/components/ui-x/confirm-button'
import { cfm_api } from '@/services/api'

const ProjectDetailsDrawer = ({
	open, onOpenChange,
	data,
	callback = (e) => { }
}) => {

	const { delete_con_project } = cfm_api()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => delete_con_project(data.project_id),
		onSuccess: () => {
			queryClient.invalidateQueries(['con-projects'])
			toast.warning('Your data has been deleted.')
			onOpenChange(false)
		},
		onError: () => {
			toast.error('Something went wrong.')
		}
	})

	const handleDelete = () => {
		mutation.mutate(data.project_id)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="h-full sm:h-[60vh] flex flex-col p-0" onInteractOutside={(e) => e.preventDefault()}>

				<Tabs defaultValue="information" className="flex flex-col h-full">
					<DrawerHeader className="mt-3 py-0">
						<DrawerTitle>{data.project_name}</DrawerTitle>
						<DrawerDescription className="flex gap-2 justify-center">

							<Button variant="secondary" size="icon-sm" onClick={() => callback({ action: 'edit' })}>
								<IconEdit size={14} className="text-green-700" />
							</Button>

							<ConfirmButton callback={handleDelete} />

						</DrawerDescription>
					</DrawerHeader>

					<div className="flex justify-center w-full px-2 sm:px-0 py-2">
						<TabsList className="flex justify-start overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
							<TabsTrigger value="information">Information</TabsTrigger>
							<TabsTrigger value="contractscosts">Contracts - Costs</TabsTrigger>
							<TabsTrigger value="schedules">Schedules</TabsTrigger>
							<TabsTrigger value="documents">Documents</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex-1 min-h-0 overflow-y-auto px-4 py-2 m-scroll">
						<ProjectTabsInfos value="information" data={data} />
					</div>

				</Tabs>

			</DrawerContent>
		</Drawer>
	)
}

export default ProjectDetailsDrawer