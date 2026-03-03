import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const HONEY_PRODUCT_ID = 'prod_QhvHmLheY7XYdV'

function getAppBaseUrl(request: NextRequest) {
	const configuredUrl =
		process.env.NEXT_PUBLIC_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')

	if (configuredUrl) {
		return configuredUrl.replace(/\/$/, '')
	}

	return new URL(request.url).origin
}

async function getCheckoutPriceId(productId: string) {
	const product = await stripe.products.retrieve(productId)

	if ('deleted' in product && product.deleted) {
		throw new Error(`Stripe product not found: ${productId}`)
	}

	if (typeof product.default_price === 'string' && product.default_price) {
		return product.default_price
	}

	const prices = await stripe.prices.list({
		product: productId,
		active: true,
		limit: 1,
	})

	if (!prices.data.length) {
		throw new Error(`No active price found for product: ${productId}`)
	}

	return prices.data[0].id
}

export async function POST(request: NextRequest) {
	try {
		const { cartDetails } = await request.json()
		const appBaseUrl = getAppBaseUrl(request)

		if (!cartDetails || Object.keys(cartDetails).length === 0) {
			return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
		}

		const checkoutPriceId = await getCheckoutPriceId(HONEY_PRODUCT_ID)

		// Convert cart items to Stripe line items
		const lineItems = Object.values(cartDetails).map((item: any) => {
			return {
				price: checkoutPriceId,
				quantity: item.quantity,
			}
		})

		// Create Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: `${appBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${appBaseUrl}/cart`,
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
