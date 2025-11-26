import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/layouts'
import HomePage from '@/pages/home'
import EmployeesPage from '@/pages/hrm/employees'
import ContractsPage from '@/pages/hrm/contracts'

import AdminLandingPage from '@/pages/admin'
import UsersPage from '@/pages/admin/users'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>NOT FOUND</div>,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/employees', element: <EmployeesPage /> },
			{ path: '/contracts', element: <ContractsPage /> },

			{ path: '/admin', element: <AdminLandingPage /> },
			{ path: '/admin/users', element: <UsersPage /> },
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes