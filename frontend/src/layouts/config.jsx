import { IconBriefcase, IconUsersGroup } from '@tabler/icons-react'

export const hrm_menu_items = (t) => [
	{
		title: t('employees.management'), url: '#', icon: IconUsersGroup,
		items: [
			{ title: t('employees'), url: '/employees' },
			{ title: t('contracts'), url: '/contracts' },
		]
	},
	{
		title: t('workdays'), url: '#', icon: IconBriefcase,
		items: [
			{ title: 'Leaves', url: '#' }
		]
	}
]