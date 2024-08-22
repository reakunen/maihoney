'use client'
import React, { useEffect, useRef } from 'react'
import JSConfetti from 'js-confetti'

import Link from 'next/link'

export default function SuccessPage() {
	const confettiRef = useRef(null)
	useEffect(() => {
		if (confettiRef.current) {
			const jsConfetti = new JSConfetti()
			jsConfetti.addConfetti()
		}
	}, [])

	return (
		<div
			ref={confettiRef}
			className="flex min-h-[100dvh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
			style={{ backgroundImage: `url('/images/img5.jpg')` }}
		>
			<div className="absolute inset-0 bg-black opacity-40"></div>

			<div className="relative z-10 mx-auto max-w-md text-center">
				<CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
				<h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl text-yellow-300">
					Thank You for Your Order!
				</h1>
				<p className="mt-4 text-base sm:text-lg text-muted">
					An email will be sent to you about your confirmation order. If you
					ordered shipping, it should arrive in 5-7 business days.
				</p>
				<div className="mt-6">
					<Link
						href="/"
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						prefetch={false}
					>
						Go to Homepage
					</Link>
				</div>
			</div>
		</div>
	)
}

function CircleCheckIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12 2 2 4-4" />
		</svg>
	)
}
