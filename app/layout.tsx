import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from 'use-shopping-cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://www.maihoney.com'),
	keywords: [
		'honey',
		'maihoney',
		'selling honey',
		'organic',
		'natural honey',
		'beekeeping',
		'raw honey',
	],
	title: 'MaiHoney',
	openGraph: {
		description: 'Natural, Organic, Unfiltered premium honey for you',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<CartProvider
					mode="payment"
					cartMode="client-only"
					// Connects to your Stripe account
					stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
					// Redirected here after successful payments
					successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
					// Redirected here when you click back on Stripe Checkout
					cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
					currency="USD"
					// Only customers from UK will be able to purchase
					// Having this setting means that we will capture shipping address
					allowedCountries={['GB']}
					// Enables local storage
					shouldPersist={true}
				>
					<main>{children}</main>
					<Toaster />
				</CartProvider>
			</body>
		</html>
	)
}
