import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('b24_token')
		localStorage.removeItem('b24_user')

		navigate('/', { replace: true })
	}

	return { handleLogout }
}