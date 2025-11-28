import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconMail, IconPhone, IconMessageCircle } from '@tabler/icons-react'

const ContactCard = ({
	name = 'contact-name',
	role = 'position',
	email = 'email@example.com',
	phone = '+84 00 123 4567',
	avatarSrc = '',
}) => {
	return (
		<Card className="w-full sm:min-w-[280px] p-4 gap-2!">

			<CardHeader className="px-0">
				<div className="flex items-center gap-4">
					<Avatar>
						{avatarSrc ? (
							<AvatarImage src={avatarSrc} alt={name} />
						) : (
							<AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
						)}
					</Avatar>
					<div>
						<CardTitle>{name}</CardTitle>
						<CardDescription className="pt-1">{role}</CardDescription>
					</div>
				</div>
				<CardAction />
			</CardHeader>

			<CardContent className="px-0">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<IconMail className="size-4 text-muted-foreground" />
						<a className="underline-offset-2 hover:underline" href={`mailto:${email}`}>
							{email}
						</a>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<IconPhone className="size-4 text-muted-foreground" />
						<a className="underline-offset-2 hover:underline" href={`tel:${phone}`}>
							{phone}
						</a>
					</div>
				</div>
			</CardContent>

			<CardFooter className="px-0 pt-2">
				<div className="ml-auto flex gap-2">
					<Button variant="outline" size="sm" asChild>
						<a href={`mailto:${email}`} className="flex items-center gap-2">
							<IconMessageCircle />
							Message
						</a>
					</Button>
					<Button variant="outline" size="sm" asChild>
						<a href={`tel:${phone}`} className="flex items-center gap-2">
							<IconPhone />
						</a>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default ContactCard