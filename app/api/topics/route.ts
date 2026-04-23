import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const topics = await prisma.topic.findMany({
			orderBy: {
				id: "asc",
			},
			include: {
				stats: true,
			},
		});

		return NextResponse.json(topics);
	} catch (error) {
		console.log("[TOPICS_GET] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось получить темы" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name } = await req.json();

		const topic = await prisma.topic.create({
			data: {
				name,
				stats: {
					create: {
						totalQuestions: 0,
						completedQuestions: 0,
					},
				},
			},
			include: {
				stats: true,
			},
		});

		return NextResponse.json(topic);
	} catch (error) {
		console.log("[TOPICS_POST] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось добавить тему" },
			{ status: 500 },
		);
	}
}
