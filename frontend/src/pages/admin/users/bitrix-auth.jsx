import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bitrix_api } from '@/services/api'

const BitrixAuth = () => {
	const [status, setStatus] = useState('Đang khởi tạo...')
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const code = params.get('code')
		const domain = params.get('domain')

		if (code && domain) {
			setStatus('Đang xác thực với hệ thống...')
		}

		bitrix_api().auth(code, domain)
			.then(res => {
				if (res.status === 'success') {
					setStatus('Đăng nhập thành công! Đang chuyển hướng...')

					localStorage.setItem('b24_token', res.data.access_token)
					localStorage.setItem('b24_user', JSON.stringify(res.data.user))

					setTimeout(() => navigate('/'), 1500)
				}
			})
			.catch(err => {
				console.error(err)
				setStatus('Lỗi xác thực: ' + (err.response?.data?.detail || 'Không xác định'))
			})
	}, [])

	return (
		<div className="px-4 mt-4">AUTH PROCERSSING</div>
	)
}

export default BitrixAuth