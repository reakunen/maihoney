import Link from 'next/link'

export default function FooterComponent() {
	return (
		<footer className="bg-muted py-12">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="flex flex-col items-start gap-4">
					<Link href="#" className="flex items-center gap-2" prefetch={false}>
						<BeakerIcon className="w-8 h-8 text-primary" />
						<span className="text-xl font-bold">Maihoney</span>
					</Link>
					<p className="text-muted-foreground">
						Maihoney is a family-owned business that specializes in producing
						high-quality honey products. We are committed to sustainable
						beekeeping practices and delivering the best tasting honey to our
						customers.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-2">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<Link
							href="#"
							className="text-muted-foreground hover:text-primary"
							prefetch={false}
						>
							Home
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-primary"
							prefetch={false}
						>
							About
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-primary"
							prefetch={false}
						>
							Products
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-primary"
							prefetch={false}
						>
							Contact
						</Link>
					</div>
					<div className="grid gap-2">
						<h3 className="text-lg font-semibold">Contact</h3>
						<div className="flex items-center gap-2">
							<PhoneIcon className="w-5 h-5 text-muted-foreground" />
							<a href="#" className="text-muted-foreground hover:text-primary">
								+1 (234) 567-890
							</a>
						</div>
						<div className="flex items-center gap-2">
							<MailIcon className="w-5 h-5 text-muted-foreground" />
							<a href="#" className="text-muted-foreground hover:text-primary">
								info@maihoney.com
							</a>
						</div>
						<div className="flex items-center gap-2">
							<MapPinIcon className="w-5 h-5 text-muted-foreground" />
							<p className="text-muted-foreground">
								123 Honey Lane, Beeville, CA 12345
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

function BeakerIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4.5 3h15" />
			<path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
			<path d="M6 14h12" />
		</svg>
	)
}

function MailIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	)
}

function MapPinIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	)
}

function PhoneIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	)
}
