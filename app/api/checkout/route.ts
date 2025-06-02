import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51KymDlHW5I9lGqZOyng9GBfzyO4SR9z5huiUhwpGnSOIdusvHdwBEKYD58bm91cbomYqpS0L2klTTLXX3OaxULpt00jlRhZDuO")

export async function POST(request: NextRequest) {
	try {
		const { cartDetails } = await request.json()

		if (!cartDetails || Object.keys(cartDetails).length === 0) {
			return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
		}

		// Convert cart items to Stripe line items
		const lineItems = Object.values(cartDetails).map((item: any) => {
			// Handle image URL - ensure it's absolute or remove it if invalid
			let imageUrl = null
			if (item.image) {
				if (
					item.image.startsWith('http://') ||
					item.image.startsWith('https://')
				) {
					// Already an absolute URL
					imageUrl = item.image
				} else if (item.image.startsWith('/')) {
					// Relative URL - convert to absolute
					imageUrl = `${process.env.NEXT_PUBLIC_URL}${item.image}`
				}
				// If it's neither absolute nor relative path starting with /, skip the image
			}

			const productData: any = {
				name: item.name,
				description: item.description || 'Premium Honey',
			}

			// Only add images if we have a valid URL
			if (imageUrl) {
				productData.images = [imageUrl]
			}

			return {
				price_data: {
					currency: item.currency,
					product_data: productData,
					unit_amount: item.price,
				},
				quantity: item.quantity,
			}
		})

		// Create Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
			shipping_address_collection: {
				allowed_countries: ['US'],
			},
			billing_address_collection: 'required',
		})

		return NextResponse.json({ sessionId: session.id })
	} catch (error) {
		console.error('Error creating checkout session:', error)
		return NextResponse.json(
			{ error: 'Error creating checkout session ' + error },
			{ status: 500 }
		)
	}
}
