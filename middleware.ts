// middleware.ts - создай в корне проекта
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const writeMethods = ["POST", "PUT", "PATCH", "DELETE"];
	const isWriteMethod = writeMethods.includes(request.method);
	const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

	const isVerifyRoute = request.nextUrl.pathname === "/api/admin/verify";

	if (isApiRoute && isWriteMethod && !isVerifyRoute) {
		const adminToken = request.cookies.get("admin-token");

		if (!adminToken || adminToken.value !== "authenticated") {
			return NextResponse.json(
				{ error: "Доступ запрещен. Требуется авторизация." },
				{ status: 401 },
			);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/api/:path*",
};
