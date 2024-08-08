import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MailIcon, PhoneIcon, MapPin } from 'lucide-react'
import { Separator } from '../ui/separator'

import MapComponent from './MapComponent'
import ContactFormComponent from './ContactFormComponent'

export default function ContactForm() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto py-12 md:py-20">
			<div className="mx-6">
				<MapComponent />
			</div>
			<div className="space-y-6 mx-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">Information</h1>
					<p className="text-muted-foreground py-4">
						If you want to buy honey in person to avoid shipping fees, or any
						general questions, get in contact below, and we will respond as soon
						as possible!
					</p>
					<div className="space-y-2">
						<div className="flex gap-3">
							<PhoneIcon /> +1 (510)-501-0079
						</div>
						<a className="flex gap-3" href="mailto:brianm17055@gmail.com">
							<MailIcon /> brianm17055@gmail.com
						</a>
						<div className="flex gap-3">
							<MapPin />
							San Lorenzo, California
						</div>
					</div>
				</div>
				<Separator className="bg-muted-foreground" />
				<ContactFormComponent />
			</div>
		</div>
	)
}
