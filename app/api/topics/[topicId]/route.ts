import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ topicId: string }> },
) {
	try {
		const { topicId } = await params;
		const topic = await prisma.topic.findUnique({
			where: {
				id: Number(topicId),
			},
			include: {
				stats: true,
				questions: {
					orderBy: {
						id: "asc",
					},
				},
			},
		});

		if (!topic) {
			throw new Error("Тема не найдена");
		}

		return NextResponse.json(topic);
	} catch (error) {
		console.log("[TOPIC_GET] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось получить тему" },
			{ status: 500 },
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ topicId: string }> },
) {
	try {
		const newFields = await req.json();
		const { topicId } = await params;

		const topic = await prisma.topic.update({
			where: {
				id: Number(topicId),
			},
			data: newFields,
		});

		return NextResponse.json(topic);
	} catch (error) {
		console.log("[TOPIC_PATCH] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось обновить тему" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ topicId: string }> },
) {
	try {
		const { topicId } = await params;

		await prisma.topic.delete({
			where: { id: Number(topicId) },
		});

		return NextResponse.json({ message: "Тема успешно удалена" });
	} catch (error) {
		console.log("[TOPIC_DELETE] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось удалить тему" },
			{ status: 500 },
		);
	}
}
