import { Button } from '@/components/ui/button'
import { IconLogin2 } from '@tabler/icons-react'

const HomePage = () => {
	const BITRIX_DOMAIN = 'aresen.bitrix24.com'
	const CLIENT_ID = import.meta.env.VITE_BITRIX_CLIENT_ID
	const REDIRECT_URI = 'http://localhost:8000/bitrix/auth'

	const handleLogin = () => {
		const authUrl = `https://${BITRIX_DOMAIN}/oauth/authorize/` +
			`?client_id=${CLIENT_ID}` +
			`&response_type=code` +
			`&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

		window.location.href = authUrl
	};


	return (
		<div className="px-4 mt-4">
			<Button size="sm" variant="outline"
				onClick={handleLogin}
			>
				<IconLogin2 size={14} /> Login with Bitrix24
			</Button>
		</div>
	)
}

export default HomePage