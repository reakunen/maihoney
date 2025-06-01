import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
const pool = new Pool({
	connectionString:
		'postgresql://postgres.smzybsfugnnuhmyiozvt:Steadying-Eatable8-Mammogram@aws-0-us-west-1.pooler.supabase.com:5432/postgres', // DONT CHANGE THIS. ITS THE SAME CONNECTION URL FOR BOTH SMALL AND BIG DB
})

// Ensure the emails table exists
async function ensureEmailsTableExists() {
	const createTableQuery = `
		CREATE TABLE IF NOT EXISTS emails (
			id SERIAL PRIMARY KEY,
			email VARCHAR(255) NOT NULL UNIQUE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`

	let client
	try {
		client = await pool.connect()
		await client.query(createTableQuery)
	} catch (error) {
		console.error('Error creating emails table:', error)
	} finally {
		if (client) client.release()
	}
}

export async function GET(req: NextRequest) {
	try {
		// Get all emails from the table
		let client
		try {
			client = await pool.connect()
			const result = await client.query(
				'SELECT * FROM emails ORDER BY created_at DESC'
			)

			return NextResponse.json({
				message: 'Emails retrieved successfully',
				emails: result.rows,
				count: result.rows.length,
				timestamp: new Date().toISOString(),
				status: 'success',
			})
		} catch (error: any) {
			console.error('Database error:', error)
			return NextResponse.json(
				{
					message: 'Error retrieving emails',
					error: error.message,
					status: 'error',
				},
				{ status: 500 }
			)
		} finally {
			if (client) client.release()
		}
	} catch (error: any) {
		return NextResponse.json(
			{
				message: 'Server error',
				error: error.message,
				status: 'error',
			},
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		// Validate that email is provided
		if (!body.email) {
			return NextResponse.json(
				{
					message: 'Email is required',
					status: 'error',
				},
				{ status: 400 }
			)
		}

		// Insert email into the database
		let client
		try {
			client = await pool.connect()

			// Use INSERT ... ON CONFLICT to handle duplicate emails gracefully
			const insertQuery = `
				INSERT INTO emails (email) 
				VALUES ($1) 
				ON CONFLICT (email) 
				DO UPDATE SET updated_at = CURRENT_TIMESTAMP
				RETURNING *;
			`

			const result = await client.query(insertQuery, [body.email])

			return NextResponse.json({
				message: 'Email submitted successfully',
				email: result.rows[0],
				timestamp: new Date().toISOString(),
				status: 'success',
			})
		} catch (error: any) {
			console.error('Database error:', error)
			return NextResponse.json(
				{
					message: 'Error saving email',
					error: error.message,
					status: 'error',
				},
				{ status: 500 }
			)
		} finally {
			if (client) client.release()
		}
	} catch (error: any) {
		return NextResponse.json(
			{
				message: 'Error processing request',
				error: error.message,
				status: 'error',
			},
			{ status: 400 }
		)
	}
}
