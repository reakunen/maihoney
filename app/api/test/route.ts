import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		// Get query parameters if any
		const { searchParams } = new URL(request.url)
		const name = searchParams.get('name') || 'World'

		// Return test response
		return NextResponse.json({
			message: `Hello, ${name}!`,
			timestamp: new Date().toISOString(),
			method: 'GET',
			status: 'success',
		})
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		return NextResponse.json({
			message: 'POST request received',
			receivedData: body,
			timestamp: new Date().toISOString(),
			method: 'POST',
			status: 'success',
		})
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid JSON or Internal Server Error' },
			{ status: 400 }
		)
	}
}
