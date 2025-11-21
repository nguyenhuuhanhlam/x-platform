import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import AppSidebar from './app-sidebar'
import LangSwitcher from '@/components/ui-x/lang-switcher'

const Layout = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="flex flex-col h-full">
				<header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b px-4 bg-background">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>Loc 1</BreadcrumbItem>
							<BreadcrumbItem>Loc 2</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<div className="flex-1" />

					<LangSwitcher />
				</header>
				<div className="flex-1 overflow-auto">
					<Outlet className="h-full" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default Layout