'use client'

import Image from 'next/image'
import Background from '@/public/images/img7.jpg'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function CartPage() {
	const {
		cartDetails,
		removeItem,
		incrementItem,
		decrementItem,
		totalPrice,
		cartCount,
	} = useShoppingCart()

	const [isLoading, setIsLoading] = useState(false)
	const cartItems = Object.values(cartDetails ?? {})

	const handleCheckout = async () => {
		if (cartItems.length === 0) {
			toast.error('Your cart is empty!')
			return
		}

		setIsLoading(true)
		try {
			// Call our API to create a checkout session
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ cartDetails }),
			})

			if (!response.ok) {
				throw new Error('Failed to create checkout session')
			}

			const { sessionId, error } = await response.json()

			if (error) {
				throw new Error(error)
			}

			if (!sessionId) {
				throw new Error('No session ID returned')
			}

			// Redirect to Stripe Checkout
			const stripe = await stripePromise
			if (!stripe) {
				throw new Error('Stripe failed to load')
			}

			const { error: stripeError } = await stripe.redirectToCheckout({
				sessionId,
			})

			if (stripeError) {
				throw new Error(stripeError.message)
			}
		} catch (error) {
			console.error('Error redirecting to checkout:', error)
			toast.error(
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className="bg-white min-h-screen">
			<div className="relative w-full" style={{ height: '25vh' }}>
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-white max-sm:text-[2.5rem] text-[3rem] font-bold">
						Cart
					</h1>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 py-8">
				{cartItems.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="text-2xl font-semibold text-gray-600 mb-4">
							No Items in your cart!
						</h2>
						<Link
							href="/"
							className="inline-block bg-yellow-300 text-yellow-950 px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
						>
							Continue Shopping
						</Link>
					</div>
				) : (
					<div className="grid gap-8 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
							<div className="space-y-4">
								{cartItems.map((item) => (
									<div
										key={item.id}
										className="flex items-center gap-4 p-4 border rounded-lg"
									>
										<Image
											src={item.image || '/images/honeybottle.png'}
											alt={item.name}
											width={80}
											height={80}
											className="rounded-lg"
										/>
										<div className="flex-1">
											<h3 className="font-semibold text-lg">{item.name}</h3>
											<p className="text-gray-600">
												{formatCurrencyString({
													value: item.price,
													currency: item.currency,
												})}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() => decrementItem(item.id)}
												className="p-1 rounded-full hover:bg-gray-100"
											>
												<Minus size={16} />
											</button>
											<span className="w-8 text-center">{item.quantity}</span>
											<button
												onClick={() => incrementItem(item.id)}
												className="p-1 rounded-full hover:bg-gray-100"
											>
												<Plus size={16} />
											</button>
										</div>
										<button
											onClick={() => removeItem(item.id)}
											className="p-2 text-red-500 hover:bg-red-50 rounded-full"
										>
											<Trash2 size={16} />
										</button>
									</div>
								))}
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="bg-gray-50 p-6 rounded-lg sticky top-4">
								<h3 className="text-xl font-bold mb-4">Order Summary</h3>
								<div className="space-y-2 mb-4">
									<div className="flex justify-between">
										<span>Items ({cartCount})</span>
										<span>
											{formatCurrencyString({
												value: totalPrice || 0,
												currency: 'USD',
											})}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Shipping</span>
										<span>Free</span>
									</div>
									<hr className="my-2" />
									<div className="flex justify-between font-bold text-lg">
										<span>Total</span>
										<span>
											{formatCurrencyString({
												value: totalPrice || 0,
												currency: 'USD',
											})}
										</span>
									</div>
								</div>
								<button
									onClick={handleCheckout}
									className="w-full bg-yellow-300 text-yellow-950 py-3 px-6 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
									disabled={isLoading}
								>
									{isLoading ? 'Processing...' : 'Proceed to Checkout'}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}
