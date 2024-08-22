import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from 'use-shopping-cart'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://www.maihoney.com'),
	keywords: [
		'buy honey',
		'honey',
		'maihoney',
		'selling honey',
		'organic',
		'natural honey',
		'beekeeping',
		'raw honey',
	],
	title: 'maihoney',
	openGraph: {
		title: 'maihoney',
		description: 'Natural, Organic, Unfiltered premium honey made in California',
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
					<main>{children}</main>
					<Analytics mode={'production'} />
					<Toaster />
			</body>
		</html>
	)
}
