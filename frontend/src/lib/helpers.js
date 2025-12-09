export const format_phonestring = (s) => {
	if (!s) return ''
	
	// giữ lại số, loại bỏ ký tự khác nếu có
	const digits = s.replace(/\D/g, "")

	// đảm bảo là chuỗi 10 số
	if (digits.length !== 10) return s

	return digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
}