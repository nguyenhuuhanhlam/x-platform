import { useEffect } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

const EmployeeDetailsDrawer = ({ open, onOpenChange, data }) => {

	useEffect(() => {
		if (open) {
			console.log(data)
		}
	}, [open])

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			{/* <DrawerTrigger>Open</DrawerTrigger> */}
			<DrawerContent>

				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>

				{/* <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter> */}

			</DrawerContent>
		</Drawer>
	)
}

export default EmployeeDetailsDrawer