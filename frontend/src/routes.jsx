import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/layouts'
import HomePage from '@/pages/home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>NOT FOUND</div>,
		children: [
			{ index: true, element: <HomePage /> }
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes