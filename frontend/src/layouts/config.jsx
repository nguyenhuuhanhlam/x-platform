import { IconUsersGroup, IconSettings, IconBriefcase2, IconCalendarUser, IconXboxBFilled } from '@tabler/icons-react'

export const hrm_menu_items = (t) => [
	{
		title: t('employees.management'), url: '#', icon: IconUsersGroup,
		items: [
			{ title: t('employees'), url: '/employees' },
			{ title: t('contracts'), url: '/contracts' },
		]
	},
	{
		title: t('workdays'), url: '#', icon: IconCalendarUser,
		items: [
			{ title: 'Leaves', url: '#' }
		]
	}
]

export const cfm_menu_items = (t) => [
	{
		title: t('cfm.management'), url: '#', icon: IconBriefcase2,
		items: [
			{ title: t('Projects'), url: '/cfm/projects' },
		]
	},
]

export const b24_menu_items = (t) => [
	{
		title: 'HRs', url: '#', icon: IconXboxBFilled,
		items: [
			{ title: 'Company Structure', url: '/b24/hr/structure' },
		]
	},
]

export const admin_menu_items = [
	{
		title: 'Settings', url: '#', icon: IconSettings,
		items: [
			{ title: 'Users', url: '/admin/users' }
		]
	}
]