'use client'
import { useShoppingCart } from 'use-shopping-cart'
import { CartProvider } from 'use-shopping-cart'
import React from 'react'
import PageLoader from '@/components/page-loader'
import { FlyoutNav } from '@/components/Navbar'
import FooterComponent from '@/components/Footer'
export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="">
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
				// Only customers from US will be able to purchase
				// Having this setting means that we will capture shipping address
				allowedCountries={['US']}
				// Enables local storage
				shouldPersist={true}
			>
				<FlyoutNav />
				{children}
				<FooterComponent />
			</CartProvider>
		</div>
	)
}
