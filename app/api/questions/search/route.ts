import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get("query") ?? "";
		const questions = await prisma.question.findMany({
			where: {
				title: {
					contains: query,
					mode: "insensitive",
				},
			},
			take: 8,
		});

		return NextResponse.json(questions);
	} catch (error) {
		console.log("[QUESTIONS_SEARCH] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось найти вопросы" },
			{ status: 500 },
		);
	}
}
