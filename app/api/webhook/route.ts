import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Return a simple success response
    return NextResponse.json({
        status: "success",
        message: "Dummy webhook route received the request",
    });
}
