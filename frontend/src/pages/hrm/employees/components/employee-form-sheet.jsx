import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const EmployeeFormSheet = ({ open = false, onOpenChange }) => {
	useEffect(() => {
		if (!open) {
			// reset logic
		}
	}, [open])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="min-w-full sm:min-w-1/3">

				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your account
						and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>

			</SheetContent>
		</Sheet>
	)
}

export default EmployeeFormSheet