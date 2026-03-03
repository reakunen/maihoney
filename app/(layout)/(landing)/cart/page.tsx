'use client'

import Image from 'next/image'
import Background from '@/public/images/img7.jpg'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
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
					: 'Something went wrong. Please try again.',
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-stone-50">
			<div className="relative h-48 w-full overflow-hidden md:h-56">
				<Image
					src={Background}
					fill
					alt="Shopping cart header background"
					style={{ objectFit: 'cover' }}
					priority
				/>
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute inset-0 mx-auto flex h-full max-w-5xl items-center justify-center px-4">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-white md:text-5xl">Cart</h1>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
				{cartItems.length === 0 ? (
					<div className="rounded-2xl border border-stone-200 bg-white p-10 text-center md:p-12">
						<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
							<ShoppingCart className="h-8 w-8 text-stone-600" />
						</div>
						<h2 className="mb-2 text-3xl font-bold text-stone-900">Your cart is empty</h2>
						<p className="mx-auto mb-7 max-w-lg text-stone-600">
							Add some honey to your cart and come back when you are ready to
							check out.
						</p>
						<Button
							asChild
							className="relative flex items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:bg-yellow-300 hover:text-neutral-800 hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]"
						>
						<Link href="/">Continue shopping</Link>
						</Button>
					</div>
				) : (
					<div className="grid gap-6 lg:grid-cols-[1fr_340px]">
						<div className="space-y-4">
							<div className="rounded-2xl border border-stone-200 bg-white p-4 md:p-6">
								<div className="flex flex-wrap items-end justify-between gap-3">
									<div>
										<h2 className="text-2xl font-bold text-stone-900">Cart items</h2>
									</div>
								</div>
								<div className="mt-5 divide-y divide-stone-200">
									{cartItems.map((item) => (
										<div
											key={item.id}
											className="py-4 first:pt-0 last:pb-0"
										>
											<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
												<div className="flex min-w-0 items-center gap-4">
													<div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-stone-100">
														<Image
															src={item.image || '/images/honeybottle.png'}
															alt={item.name}
															fill
															className="object-contain p-2"
														/>
													</div>
													<div className="min-w-0">
														<h3 className="truncate text-base font-semibold text-stone-900 md:text-lg">
															{item.name}
														</h3>
														<p className="font-medium text-stone-900">
															{formatCurrencyString({
																value: item.price,
																currency: item.currency,
															})}
														</p>
													</div>
												</div>
												<div className="flex items-center justify-between gap-3 sm:justify-end">
													<div className="flex items-center rounded-lg border border-stone-300">
														<button
															onClick={() => decrementItem(item.id)}
															className="rounded-l-lg p-2 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed"
															disabled={item.quantity <= 1}
															aria-label={`Decrease quantity of ${item.name}`}
														>
															<Minus
																size={16}
																className={
																	item.quantity <= 1
																		? 'text-stone-300'
																		: 'text-stone-700'
																}
															/>
														</button>
														<span className="w-8 text-center text-sm font-semibold text-stone-900">
															{item.quantity}
														</span>
														<button
															onClick={() => incrementItem(item.id)}
															className="rounded-r-lg p-2 transition-colors hover:bg-stone-100"
															aria-label={`Increase quantity of ${item.name}`}
														>
															<Plus size={16} className="text-stone-700" />
														</button>
													</div>
													<button
														onClick={() => removeItem(item.id)}
														className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
														title="Remove item"
														aria-label={`Remove ${item.name} from cart`}
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

						<div>
							<div className="sticky top-6 space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
								<h3 className="text-xl font-bold text-stone-900">Order summary</h3>
								<div className="space-y-3 rounded-xl bg-stone-100 p-4">
									<div className="flex items-center justify-between">
										<span className="text-stone-700">
											Subtotal ({uniqueCount} item{uniqueCount !== 1 ? 's' : ''}
											)
										</span>
										<span className="font-semibold text-stone-900">
											{formatCurrencyString({
												value: totalPrice || 0,
												currency: 'USD',
											})}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-stone-700">Shipping</span>
										<span className="text-stone-700">
											Calculated at checkout
										</span>
									</div>
									<div className="border-t border-stone-200 pt-3">
										<div className="flex items-center justify-between font-semibold text-stone-900">
											<span>Estimated total</span>
											<span>
												{formatCurrencyString({
													value: totalPrice || 0,
													currency: 'USD',
												})}
											</span>
										</div>
									</div>
								</div>

								<Button
									onClick={handleCheckout}
									disabled={isLoading}
									aria-busy={isLoading}
									className="relative flex w-full items-center justify-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:bg-yellow-300 hover:text-neutral-800 hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]"
									>
									{isLoading ? (
										<div className="flex items-center justify-center gap-2">
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-900/30 border-t-yellow-900"></div>
											Processing...
										</div>
									) : (
										'Proceed to checkout'
									)}
								</Button>

								<div className="text-center text-sm text-stone-600">
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
