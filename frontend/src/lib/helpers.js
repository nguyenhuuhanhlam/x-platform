import dayjs from 'dayjs'
import { PD, SI, DD, PIT_RULES } from '@/constants'

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

// calculate social insurance deduction
export const si_deduction = (basic_pay = 0, contract_type = 'TV') => {
	if (contract_type === 'TV') {
		return 0
	}

	return Math.round(basic_pay * SI)
}

// calculate PIT deduction
export const pit_deduction = ({
	gross_pay = 0,
	basic_pay = 0,
	dependent_count = 0
}) => {

	if (gross_pay > PD) {
		const result = gross_pay - PD - (basic_pay * SI) - (dependent_count * DD)

		const index = PIT_RULES.findIndex(
			(rule) => result >= rule.range[0] && result < rule.range[1]
		)

		if (index < 0)
			return 0
		else
			return result * PIT_RULES[index].pct - PIT_RULES[index].sub
	}

	return 0
}
