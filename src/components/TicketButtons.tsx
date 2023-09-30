import { useUser } from '@hooks/useUser'
import { atcb_action as addToCalendar } from 'add-to-calendar-button'
import { Icons } from '@components/Icons'
import { Button } from './Button'

export function TicketButtons () {
	const { user } = useUser()

	const handleAddCalendar = (e) => {
		const config = {
			name: 'miduFest - Conferencia de programación y desarrollo',
			description:
				'Entra a [url]https://twitch.tv/midudev[/url] para disfrutar totalmente gratis de la conferencia.',
			startDate: '2023-03-21',
			startTime: '18:00',
			endDate: '2023-03-22',
			endTime: '22:00',
			timeZone: 'Europe/Madrid',
			location: 'https://midufest.com',
			buttonStyle: 'round',
			language: 'es',
			options: ['Google', 'Apple', 'iCal'],
			dates: [{
				startDate: '2023-03-21',
				startTime: '18:00',
				endDate: '2023-03-21',
				endTime: '22:00',
				timeZone: 'Europe/Madrid'
			}, {
				startDate: '2023-03-22',
				startTime: '18:00',
				endDate: '2023-03-22',
				endTime: '22:00',
				timeZone: 'Europe/Madrid'
			}]
		}

		addToCalendar(config, e.target)
	}

	const handleCopyLink = () => {
		if (user?.username) {
			navigator.clipboard.writeText(
				`https://midufest.com?ticket=${user.username}`
			)

			import('https://cdn.skypack.dev/wc-toast').then(({ toast }) =>
				toast('Enlace copiado al portapapeles', {
					duration: 2000,
					icon: {
						type: 'success'
					}
				})
			)
		}
	}

	const hrefTwitterShare = user?.username && `https://twitter.com/intent/tweet?url=https://www.midufest.com/?ticket=${user.username}&text=%C2%A1Ya%20tengo%20mi%20ENTRADA%20para%20la%20%23MiduFest!%0AConferencia%20de%20Desarrollo%20y%20Programaci%C3%B3n%20Web.%0A%0A%C2%A1Consigue%20el%20tuyo%20totalmente%20gratis!%20%E2%87%A9`

	if (!user) return null

	return (
		<footer class='flex flex-col gap-y-2 mobile:flex-row justify-center items-center mt-10 gap-x-2'>
			<Button onClick={handleAddCalendar}>Añadir al calendario</Button>
			<Button onClick={handleCopyLink}>Copiar enlace</Button>
			<Button type='twitter' href={hrefTwitterShare}>
				<Icons.twitter class='w-4 h-4 mr-2 -ml-1' /> Compartir en Twitter
			</Button>
		</footer>
	)
}
