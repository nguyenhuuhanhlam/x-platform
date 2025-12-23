import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

import { bitrix_api } from '@/services/api'


const BitrixAuth = () => {
	const [status, setStatus] = useState('Initializing...')
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const code = params.get('code')
		const domain = params.get('domain')

		if (code && domain) {
			setStatus('System authentication in progress…')
		}

		bitrix_api().auth(code, domain)
			.then(res => {
				const { status, data } = res.data

				if (status === 'success') {
					setStatus('Authentication successful. Redirecting…')

					localStorage.setItem('b24_token', data.access_token)
					localStorage.setItem('b24_user', JSON.stringify(data.user))

					setTimeout(() => navigate('/'), 1500)
				}
			})
			.catch(err => {
				console.error(err)
				setStatus('Authentication failed: ' + (err.response?.data?.detail || 'Unknown error'))
			})
	}, [])

	return (
		<div className="flex flex-col sm:flex-row px-4 mt-4 gap-2">
			<Badge variant="secondary" className="bg-green-900"> AUTH </Badge>
			<Badge variant="secondary" className="truncate">{status}</Badge>
		</div>
	)
}

export default BitrixAuth