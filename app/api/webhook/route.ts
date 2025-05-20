import { NextResponse } from "next/server";

export async function POST(req) {
    // Return a simple success response
    return NextResponse.json({
        status: "success",
        message: "Dummy webhook route received the request",
    });
}
