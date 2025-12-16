// social security insurance :: bảo hiểm xã hội
export const SI = 0.105

// personal deduction :: giảm trừ bản thân
export const PD = 11000000

// dependent deduction :: giảm trừ phụ thuộc
export const DD = 4400000

// PIT rules :: biểu thuế lũy tiến từng phần
export const PIT_RULES = [
	{ range: [0, 5000000], pct: 5 / 100, sub: 0 },
	{ range: [5000000, 10000000], pct: 10 / 100, sub: 250000 },
	{ range: [10000000, 18000000], pct: 15 / 100, sub: 750000 },
	{ range: [18000000, 32000000], pct: 20 / 100, sub: 1650000 },
	{ range: [32000000, 52000000], pct: 25 / 100, sub: 3250000 },
	{ range: [52000000, 80000000], pct: 30 / 100, sub: 5850000 },
	{ range: [80000000, Number.MAX_SAFE_INTEGER], pct: 35 / 100, sub: 9850000 }
]

export const FUNDING_SOURCE = {
	1: { text: 'Funded', tagClass: 'dark:bg-green-900/50' },
	2: { text: 'Unfunded', tagClass: 'dark:bg-red-900/50' }
}

export const CONTRACT_STATUS = {
	'K': { text: 'Đã Ký', tagClass: 'dark:bg-green-900/50' },
	'TL': { text: 'Thanh Lý', tagClass: 'dark:bg-yellow-900/50' },
	'H': { text: 'Hủy', tagClass: 'dark:bg-red-900/50' }
}

export const INCOME_TYPES = {
	'TU': { text: 'Tạm ứng', tagClass: 'dark:text-amber-500' },
	'GD': { text: 'Giai đoạn', tagClass: 'dark:text-green-500' },
	'BH': { text: 'Bảo hành', tagClass: 'dark:text-blue-500' }
}

export const INCOME_STATUS = {
	'KH': { text: 'Kế hoạch', tagClass: 'dark:text-stone-500' },
	'HT': { text: 'Hoàn thành', tagClass: 'dark:text-green-500' },
}