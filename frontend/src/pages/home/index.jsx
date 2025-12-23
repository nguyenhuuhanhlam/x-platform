import { Button } from '@/components/ui/button'
import { IconLogin2 } from '@tabler/icons-react'

import { useEffect, useState } from 'react'

const HomePage = () => {
	const BITRIX_DOMAIN = 'aresen.bitrix24.com'
	const CLIENT_ID = import.meta.env.VITE_BITRIX_CLIENT_ID
	const REDIRECT_URI = 'http://localhost:8000/bitrix/auth'

	const [user, setUser] = useState(null)

	useEffect(() => {
		const savedUser = localStorage.getItem('b24_user')
		if (savedUser) {
			setUser(JSON.parse(savedUser))
		}
	}, [])

	const handleLogin = () => {
		const authUrl = `https://${BITRIX_DOMAIN}/oauth/authorize/` +
			`?client_id=${CLIENT_ID}` +
			`&response_type=code` +
			`&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

		window.location.href = authUrl
	};

	return (
		<div className="px-4 mt-4">
			{user ? (
				<div className="flex items-center gap-2">
					<span>Welcome, <strong>{user.NAME}</strong>!</span>
				</div>
			) : (
				<Button size="sm" variant="outline" className="bg-blue-900!" onClick={handleLogin}>
					<IconLogin2 size={14} /> Login with Bitrix24
				</Button>
			)}
		</div>
	)
}

export default HomePage