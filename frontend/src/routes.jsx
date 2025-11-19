import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{ path: '/', element: <div>ROOT PATH</div> }
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes