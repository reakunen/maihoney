'use client'

import Image from 'next/image'
import Background from '@/public/images/img7.jpg'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import {
	Trash2,
	Plus,
	Minus,
} from 'lucide-react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

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
	const uniqueCount = cartCount ?? 0
	const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
		<main className="min-h-screen bg-gray-50">
			<div className="relative h-56 w-full overflow-hidden md:h-64">
				<Image
					src={Background}
					fill
					alt="Shopping cart header background"
					style={{ objectFit: 'cover' }}
					priority
				/>
				<div className="absolute inset-0 bg-black/45" />
				<div className="absolute inset-0">
					<div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4">
						<div className="text-center">
							<h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
								Cart
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
				{cartItems.length === 0 ? (
					<div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm md:p-14">
						<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
								<svg className="h-12 w-12 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V7a2 2 0 00-2-2H9a2 2 0 00-2 2v1" />
								</svg>
							</div>
							<h2 className="mb-3 text-3xl font-bold text-gray-900">
								Your cart is empty
							</h2>
							<p className="mx-auto mb-8 max-w-xl text-gray-600">
								Add some honey to your cart and come back when you are ready to
								check out.
							</p>
							<Link
								href="/"
								className="inline-block rounded-lg bg-yellow-400 px-7 py-3 font-semibold text-yellow-900 transition-colors hover:bg-yellow-500"
							>
								Continue shopping
							</Link>
					</div>
				) : (
					<div className="grid gap-8 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
								<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
									<h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
								</div>
								<div className="space-y-4">
									{cartItems.map((item) => (
										<div
											key={item.id}
											className="rounded-xl border border-gray-200 bg-white p-5"
										>
											<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
												<div className="flex min-w-0 items-center gap-4 md:gap-5">
													<div className="relative h-24 w-24 flex-shrink-0 rounded-lg">
														<Image
															src={item.image || '/images/honeybottle.png'}
															alt={item.name}
															fill
															className="object-contain p-1"
														/>
													</div>
													<div className="min-w-0">
														<h3 className="truncate text-lg font-semibold text-gray-900">
															{item.name}
														</h3>
														{/* <p className="text-sm text-gray-500">Unit price</p> */}
														<p className="font-medium text-gray-800">
															{formatCurrencyString({
																value: item.price,
																currency: item.currency,
															})}
														</p>
													</div>
												</div>
												<div className="ml-auto flex items-center gap-3">
													<div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
														<button
															onClick={() => decrementItem(item.id)}
															className="rounded-md p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed"
															disabled={item.quantity <= 1}
														>
															<Minus
																size={16}
																className={
																	item.quantity <= 1
																		? 'text-gray-300'
																		: 'text-gray-600'
																}
															/>
														</button>
														<span className="w-8 text-center font-semibold text-gray-900">
															{item.quantity}
														</span>
														<button
															onClick={() => incrementItem(item.id)}
															className="rounded-md p-2 transition-colors hover:bg-gray-100"
														>
															<Plus size={16} className="text-gray-600" />
														</button>
													</div>
													{/* <div className="w-24 text-right">
														<p className="text-xs text-gray-500">Line total</p>
														<p className="font-semibold text-gray-900">
															{formatCurrencyString({
																value: item.price * item.quantity,
																currency: item.currency,
															})}
														</p>
													</div> */}
													<button
														onClick={() => removeItem(item.id)}
														className="rounded-lg p-3 text-red-500 transition-colors hover:bg-red-50"
														title="Remove item"
													>
														<Trash2 size={18} />
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="sticky top-6 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
								<h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
								<div className="rounded-xl bg-gray-50 p-4">
									<div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
										<span className="text-gray-600">
											Subtotal ({uniqueCount} item{uniqueCount !== 1 ? 's' : ''})
										</span>
										<span className="font-semibold text-gray-900">
											{formatCurrencyString({
												value: totalPrice || 0,
												currency: 'USD',
											})}
										</span>
									</div>
									<div className="mb-2 flex justify-between py-1">
										<span className="text-sm text-gray-600">Shipping</span>
										<span className="text-sm text-gray-700">
											Calculated at checkout
										</span>
									</div>
									<div className="rounded-lg bg-white p-3">
										<p className="mt-1 text-xs text-gray-500">
											Final amount is confirmed by Stripe on the next step.
										</p>
									</div>
								</div>

								<button
									onClick={handleCheckout}
									disabled={isLoading}
									className="flex-1 py-3 px-6 bg-brown-500 text-neutral-900 rounded-lg border-2 border-yellow-950 transition-transform duration-300 ease-out transform hover:scale-105 shadow-[8px_8px_0px_0px_rgb(66,32,6)]"
									>
									{isLoading ? (
										<div className="flex items-center justify-center gap-2">
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-900/30 border-t-yellow-900"></div>
											Processing...
										</div>
									) : (
										'Proceed to Checkout'
									)}
								</button>

								<div className="text-center text-sm text-gray-600">
									Secure checkout powered by Stripe.
								</div>
							</div>
						</div>
					</div>
				)}

			</div>
		</main>
	)
}
