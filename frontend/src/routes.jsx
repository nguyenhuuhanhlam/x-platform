import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/layouts'
import HomePage from '@/pages/home'
import EmployeesPage from '@/pages/hrm/employees'
import ContractsPage from '@/pages/hrm/contracts'

import UsersPage from '@/pages/admin/users'

import CFMProjectsPage from '@/pages/cfm/projects'

import NotFoundPage from '@/pages/not-found'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/employees', element: <EmployeesPage /> },
			{ path: '/contracts', element: <ContractsPage /> },

			{ path: '/cfm', element: <></> },
			{ path: '/cfm/projects', element: <CFMProjectsPage /> },

			{ path: '/admin', element: <></> },
			{ path: '/admin/users', element: <UsersPage /> },
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes