// import { NextResponse } from "next/server";

// export async function GET() {
//     return NextResponse.json({ message: "Hello from API" });
// }

import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";
import { existsSync } from "fs";

// === Load the DB ===
const dbPath = "./db/bigHoney.db"; // use "./db/smallHoney.db" or "./db/bigHoney.db"

// small db has 100 rows
// big db has 100,000 rows
// db is in sqlite, use a vscode extension to view it

// Verify file exists (optional)
if (!existsSync(dbPath)) {
    console.warn("⚠️ Database file not found at", dbPath);
}

const db = new Database(dbPath, { readonly: true });

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const origin = searchParams.get("origin");
    const q = searchParams.get("q");
    // const limit = parseInt(searchParams.get("limit") || "50", 10);
    // const offset = parseInt(searchParams.get("offset") || "0", 10);

    let query = "SELECT * FROM honeys";
    const params: any[] = [];
    const conditions: string[] = [];

    if (id) {
        conditions.push("id = ?");
        params.push(id);
    }

    if (name) {
        conditions.push("name = ?");
        params.push(name);
    }

    if (origin) {
        conditions.push("origin = ?");
        params.push(origin);
    }

    if (q) {
        conditions.push("(name LIKE ? OR notes LIKE ?)");
        params.push(`%${q}%`, `%${q}%`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    // query += " LIMIT ? OFFSET ?";
    // params.push(limit, offset);

    try {
        const stmt = db.prepare(query);
        const rows = stmt.all(...params);
        return NextResponse.json(rows);
    } catch (error: any) {
        console.error("Database error:", error.message);
        return NextResponse.json(
            { error: "Query failed", details: error.message },
            { status: 500 }
        );
    }
}
