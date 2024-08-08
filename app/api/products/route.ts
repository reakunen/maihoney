import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(req: NextRequest) {
	try {
		const products = await stripe.products.list({
			limit: 100,
		});
		return NextResponse.json(products, { status: 200 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}