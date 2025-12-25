import dayjs from 'dayjs'
import { PD, SI, DD, PIT_RULES } from '@/constants'

export const fmt_thousand = (val) => {
	if (val === null || val === undefined || val === '') return ''

	const num = Number(val)
	if (isNaN(num)) return val

	return num.toLocaleString('vi-VN')
}

export const fmt_phonestring = (s) => {
	if (!s) return '-'

	const hasPlus84 = s.trim().startsWith('+84')

	// Lấy toàn bộ chữ số
	let digits = s.replace(/\D/g, '')

	// Chuẩn hoá về 10 số nội địa
	if (digits.startsWith('84') && digits.length === 11) {
		digits = '0' + digits.slice(2)
	}

	if (digits.length !== 10) return s

	// Bỏ số 0 đầu nếu hiển thị +84
	if (hasPlus84) {
		const local = digits.slice(1) // bỏ 0
		return `+84 ${local.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}`
	}

	// Nội địa
	return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}


export const fmt_date = (value, fmt = 'DD-MM-YYYY', fallback = '-') => {
	if (!value) return fallback

	const d = dayjs(value)
	return d.isValid() ? d.format(fmt) : fallback
}

// calculate social insurance deduction
export const si_deduction = (basic_pay = 0, contract_type = 'TV') => {
	if (contract_type === 'TV') {
		return 0
	}

	return Math.round(basic_pay * SI)
}