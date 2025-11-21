import { useTranslation } from 'react-i18next'
import { Switch } from '@/components/ui/switch'

export default function LangSwitcher() {
	const { i18n } = useTranslation()

	const isEn = i18n.language === 'en'

	const toggleLanguage = () => {
		const next = isEn ? 'vi' : 'en'
		i18n.changeLanguage(next)
		localStorage.setItem("lang", next)
	};

	return (
		<div className="flex items-center gap-2">
			<span className="text-[.5rem]">VN</span>
			<Switch
				id="lang-switch"
				checked={isEn}
				onCheckedChange={toggleLanguage}
			/>
			<span className="text-[.5rem]">US</span>
		</div>
	);
}