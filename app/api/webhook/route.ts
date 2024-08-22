import Stripe from 'stripe'

import { NextResponse, NextRequest } from 'next/server'
import { Resend } from 'resend'
import KoalaWelcomeEmail from '@/components/emails/email'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
	const payload = await req.text()
	const res = JSON.parse(payload)

	const sig = req.headers.get('Stripe-Signature')

	const dateTime = new Date(res?.created * 1000).toLocaleDateString()
	const timeString = new Date(res?.created * 1000).toLocaleDateString()

	try {
		let event = stripe.webhooks.constructEvent(
			payload,
			sig!,
			process.env.STRIPE_WEBHOOK_SECRET!
		)

		const name = res?.data?.object?.billing_details?.name
		const receipt_url = res?.data?.object?.receipt_url
		const email = res?.data?.object?.billing_details?.email
		let paid = res?.data?.paid
		// console.log(
		// 	res?.data?.object?.billing_details?.email, // email
		// 	res?.data?.object?.amount, // amount
		// 	res?.data?.object?.billing_details?.name
		// 	JSON.stringify(res), // payment info
		// 	res?.type, // type
		// 	String(timeString), // time
		// 	String(dateTime), // date
		// 	res?.data?.object?.receipt_email, // email
		// 	res?.data?.object?.receipt_url, // url
		// 	JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
		// 	JSON.stringify(res?.data?.object?.billing_details), // Billing details
		// 	res?.data?.object?.currency // Currency
		// 
		switch (event.type) {
			case 'charge.succeeded':
				const { data, error } = await resend.emails.send({
					from: 'maihoney.com <noreply@maihoney.com>',
					to: [email],
					subject: 'Your maihoney receipt',
					react: KoalaWelcomeEmail({ name, receipt_url }),
				})
	
				if (error) {
					return res.status(400).json(error)
				}
			default:
			  console.log(`Unhandled event type ${event.type}`);
		  }

		return NextResponse.json({
			status: 'success',
			event: event.type,
			response: res,
		})
	} catch (error) {
		return NextResponse.json({ status: 'Failed', error })
	}
}
