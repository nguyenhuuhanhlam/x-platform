import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

const generateBreadcrumbs = (pathname) => {
	const parts = pathname.split('/').filter(Boolean)
	let path = ''

	return parts.map((p) => {
		path += `/${p}`
		return {
			label: p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toLowerCase()),
			href: path,
		}
	})
}

export default function AutoBreadcrumb() {
	const { pathname } = useLocation()
	const crumbs = generateBreadcrumbs(pathname)
	const { t } = useTranslation()

	return (
		<Breadcrumb>
			<BreadcrumbList>

				<BreadcrumbItem>
					<BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
				</BreadcrumbItem>

				{crumbs.map((c, i) => {
					const isLast = i === crumbs.length - 1

					return (
						<React.Fragment key={i}>
							<BreadcrumbSeparator />

							<BreadcrumbItem>
								{
									isLast
										? <BreadcrumbPage className="first-letter:uppercase">{t(c.label)}</BreadcrumbPage>
										: <BreadcrumbLink className="first-letter:uppercase" href={c.href}>{t(c.label)}</BreadcrumbLink>
								}
							</BreadcrumbItem>
						</React.Fragment>
					)
				})}

			</BreadcrumbList>
		</Breadcrumb>
	)
}