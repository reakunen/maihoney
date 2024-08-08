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
			<FlyoutNav />
			{children}
			<FooterComponent />
		</div>
	)
}
