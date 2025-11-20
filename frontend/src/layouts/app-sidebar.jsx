import { useLocation } from 'react-router-dom'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup, SidebarGroupContent,
	SidebarHeader,
	SidebarMenu, SidebarMenuItem, SidebarMenuButton,
	SidebarGroupLabel
} from "@/components/ui/sidebar"

import NavUser from "./nav-user"
import { side_menu } from './config'

const AppSidebar = () => {

	const location = useLocation()
	const path = location.pathname

	return (
		<Sidebar>

			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<span className="text-base">COMPANY NAME</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{
					side_menu.map((item, k) => (
						<SidebarGroup key={k}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{item?.items?.map((item, k) => (
										<SidebarMenuItem key={k}>
											<SidebarMenuButton asChild isActive={item?.url == path}>
												<a href={item?.url}>{item?.title}</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))
				}
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={{ name: 'Guest', email: 'no@email' }} />
			</SidebarFooter>

		</Sidebar>
	)
}

export default AppSidebar