import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { title, text, topicId } = await req.json();
		const numericTopicId = Number(topicId);

		const question = await prisma.question.create({
			data: {
				title,
				text,
				topicId: numericTopicId,
			},
		});

		if (question) {
			await prisma.topicStats.upsert({
				where: {
					topicId: numericTopicId,
				},
				update: {
					totalQuestions: {
						increment: 1,
					},
				},
				create: {
					topicId: numericTopicId,
					totalQuestions: 1,
					completedQuestions: 0,
				},
			});
		}

		return NextResponse.json(question);
	} catch (error) {
		console.log("[QUESTIONS_POST] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось добавить вопрос" },
			{ status: 500 },
		);
	}
}
