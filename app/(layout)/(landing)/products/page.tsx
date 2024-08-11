import { useEffect } from 'react'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import Background from '@/public/images/img4.jpg'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function ProductPage() {
	return (
		<>
			<main className="bg-[#ececec] min-h-screen">
				<div className="relative w-full" style={{ height: '25vh' }}>
					<Image
						src={Background}
						layout="fill"
						alt="image"
						style={{ objectFit: 'cover' }}
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-white max-sm:text-[1.5rem] text-[3rem] font-bold">
							Products
						</h1>
					</div>
				</div>
			</main>
		</>
	)
}
