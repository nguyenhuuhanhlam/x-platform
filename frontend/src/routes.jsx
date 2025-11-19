import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './layouts'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>NOT FOUND</div>,
		children: [
			{ index: true, element: <div className="flex px-2 bg-neutral-200 w-fit">OUTLET</div> }
		]
	}
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes