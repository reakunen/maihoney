import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	return NextResponse.json({
		message: 'Test route is working!',
		timestamp: new Date().toISOString(),
		status: 'success',
	})
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		return NextResponse.json({
			message: 'Received POST request successfully',
			receivedData: body,
			timestamp: new Date().toISOString(),
			status: 'success',
		})
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Error processing request',
				error: 'Invalid JSON body',
				status: 'error',
			},
			{ status: 400 }
		)
	}
}
