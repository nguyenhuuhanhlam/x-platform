import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/layouts'
import HomePage from '@/pages/home'
import EmployeesPage from '@/pages/hrm/employees'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>NOT FOUND</div>,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/employees', element: <EmployeesPage /> }
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes