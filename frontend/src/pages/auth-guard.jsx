import { Badge } from '@/components/ui/badge'

const AuthGuard = ({ children }) => {

	const token = localStorage.getItem('b24_token')
	const user = localStorage.getItem('b24_user')

	if (!token || !user) {
		return (
			<div className="p-4">
				<Badge variant="destructive">Unauthorized</Badge>
			</div>
		)
	}

	return children
}

export default AuthGuard