import dayjs from 'dayjs'

export const fmt_phonestring = (s) => {
	if (!s) return '-'

	const digits = s.replace(/\D/g, '')

	if (digits.length !== 10) return s

	return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

export const fmt_date = (value, fmt = 'DD-MM-YYYY', fallback = '-') => {
	if (!value) return fallback

	const d = dayjs(value)
	return d.isValid() ? d.format(fmt) : fallback
}
