import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage, } from '@/components/ui/avatar'
import { IconSelector, IconLogout, IconBell } from '@tabler/icons-react'

const NavUser = () => {
	const { isMobile } = useSidebar()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const savedUser = localStorage.getItem('b24_user')
		if (savedUser) {
			setUser(JSON.parse(savedUser))
		}
	}, [])

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
						// className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user?.avatar} alt={user?.NAME} />
								<AvatarFallback className="rounded-lg">{user?.NAME[0]}</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user?.NAME}</span>
								<span className="truncate text-xs">{user?.EMAIL}</span>
							</div>

							<IconSelector className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuItem>
							<IconBell /> Notifications
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<IconLogout /> Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default NavUser