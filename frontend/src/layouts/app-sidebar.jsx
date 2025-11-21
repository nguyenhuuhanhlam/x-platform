import { useTranslation } from "react-i18next"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup, SidebarGroupContent,
	SidebarHeader,
	SidebarMenu, SidebarMenuItem, SidebarMenuButton,
	SidebarGroupLabel
} from "@/components/ui/sidebar"

import NavUser from './nav-user'
import NavGroup from './nav-group'
import { hrm_menu_items } from './config'

const AppSidebar = () => {
	const { t } = useTranslation()

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
				<NavGroup group="HRM" items={hrm_menu_items(t)} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={{ name: 'Guest', email: 'no@email' }} />
			</SidebarFooter>

		</Sidebar>
	)
}

export default AppSidebar