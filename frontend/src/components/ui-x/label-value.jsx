import clsx from 'clsx'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { IconLoader2 } from '@tabler/icons-react'

// --- Helper Functions ---

// Định dạng tiền tệ: 1200 -> 1.200
const formatMoney = (val) => {
	if (val === null || val === undefined || val === '') return ''
	const num = Number(val)
	if (isNaN(num)) return val // Nếu không phải số thì trả về nguyên gốc

	// Sử dụng vi-VN để có dấu chấm phân cách hàng ngàn
	return num.toLocaleString('vi-VN')
}

// Định dạng số điện thoại: 0912345678 -> 0912 345 678 (hoặc tùy chỉnh)
const formatPhone = (val) => {
	if (!val) return ''
	const str = val.toString()

	// Regex cơ bản cho 10 số: 4 số đầu - 3 số giữa - 3 số cuối
	// Ví dụ: 0909 123 456
	return str.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

const LabelValue = ({
	label = '',
	labelClass,
	value = '',
	valueClass,
	vTag = false,
	tagClass,
	loading = false,
	type = 'text', // Thêm prop type: 'text' | 'money' | 'phone'
	suffix = ''    // Thêm hậu tố (ví dụ: 'đ', 'VND') nếu cần
}) => {

	// Hàm lấy giá trị hiển thị cuối cùng
	const getDisplayValue = () => {
		let finalValue = value

		if (type === 'money') {
			finalValue = formatMoney(value)
		} else if (type === 'phone') {
			finalValue = formatPhone(value)
		}

		// Thêm hậu tố nếu có (ví dụ: 1.200 đ)
		return suffix ? `${finalValue} ${suffix}` : finalValue
	}

	const displayContent = getDisplayValue()

	return (
		<div className="flex items-center space-x-4 justify-between leading-tight">
			<Label className={clsx('m-lv-label', labelClass)}>{label}</Label>

			<div className={clsx('m-lv-value', valueClass)}>
				{loading ? (
					<div className="flex items-center space-x-1">
						<span className="text-neutral-500 italic text-xs">Loading...</span>
						<IconLoader2 size={14} className="animate-spin text-neutral-400" />
					</div>
				) : (
					vTag ? (
						<Badge variant="secondary" className={clsx(type === 'money' ? 'font-mono' : '', tagClass)}>
							{displayContent}
						</Badge>
					) : (
						// Nếu là phone thì có thể render thẻ a để click gọi
						type === 'phone' ? (
							<a href={`tel:${value}`} className="hover:text-amber-200">
								{displayContent}
							</a>
						) : (
							<span>{displayContent}</span>
						)
					)
				)}
			</div>
		</div>
	)
}

export default LabelValue