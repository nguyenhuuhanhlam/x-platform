import { useTranslation } from "react-i18next"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "@/components/ui/sidebar"

import NavUser from './nav-user'
import NavGroup from './nav-group'
import { hrm_menu_items, admin_menu_items, cfm_menu_items } from './config'

const AppSidebar = () => {
	const { t } = useTranslation()

	return (
		<Sidebar>

			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<span className="text-base">X PLATFORM</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavGroup group="HRM" items={hrm_menu_items(t)} />
				<NavGroup group="CFM" items={cfm_menu_items(t)} />
				<NavGroup group="ADMIN" items={admin_menu_items} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={{ name: 'Guest', email: 'no@email' }} />
			</SidebarFooter>

		</Sidebar>
	)
}

export default AppSidebar