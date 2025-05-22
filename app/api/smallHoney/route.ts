import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool to supabase db
const pool = new Pool({
    connectionString:
        "postgresql://postgres.smzybsfugnnuhmyiozvt:Steadying-Eatable8-Mammogram@aws-0-us-west-1.pooler.supabase.com:5432/postgres", // DONT CHANGE THIS. ITS THE SAME CONNECTION URL FOR BOTH SMALL AND BIG DB
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const origin = searchParams.get("origin");
    const q = searchParams.get("q");
    
    const conditions: string[] = [];
    const values: any[] = [];

    if (id) {
        conditions.push(`id = $${values.length + 1}`);
        values.push(id);
    }

    if (name) {
        conditions.push(`name = $${values.length + 1}`);
        values.push(name);
    }

    if (origin) {
        conditions.push(`origin = $${values.length + 1}`);
        values.push(origin);
    }

    if (q) {
        conditions.push(
            `(name ILIKE $${values.length + 1} OR notes ILIKE $${
                values.length + 1
            })`
        );
        values.push(`%${q}%`);
    }

    const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM smallHoney ${whereClause};`; // Use smallHoney or bigHoney to change which db is should use

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error("PostgreSQL query error:", error.message);
        return NextResponse.json(
            { error: "Query failed", details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) client.release();
    }
}
