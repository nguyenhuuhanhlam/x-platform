import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/layouts'
import HomePage from '@/pages/home'
import EmployeesPage from '@/pages/hrm/employees'
import ContractsPage from '@/pages/hrm/contracts'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>NOT FOUND</div>,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/employees', element: <EmployeesPage /> },
			{ path: '/contracts', element: <ContractsPage /> },
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes