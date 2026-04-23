import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { password } = await req.json();
	} catch (error) {
		console.log("[ADMIN_VERIFY_POST] Server error", error);
	}
}
