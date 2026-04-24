import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ questionId: string }> },
) {
	try {
		const { questionId } = await params;

		const question = await prisma.question.findUnique({
			where: { id: Number(questionId) },
		});

		if (!question) {
			throw new Error("Вопрос не найден");
		}

		return NextResponse.json(question);
	} catch (error) {
		console.log("[QUESTION_GET] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось получить вопрос" },
			{ status: 500 },
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ questionId: string }> },
) {
	try {
		const { questionId } = await params;
		const { fields } = await req.json();
		const numericQuestionId = Number(questionId);

		const oldQuestion = await prisma.question.findUnique({
			where: { id: numericQuestionId },
			select: { topicId: true, success: true },
		});

		if (!oldQuestion) {
			throw new Error("Вопрос не найден");
		}

		const newTopicId = fields.topicId ?? oldQuestion.topicId;
		const newSuccess = fields.success ?? oldQuestion.success;

		const isTopicChanged = newTopicId !== oldQuestion.topicId;
		const isSuccessChanged =
			fields.success !== undefined && newSuccess !== oldQuestion.success;

		// Обновляем вопрос
		const updatedQuestion = await prisma.question.update({
			where: { id: numericQuestionId },
			data: fields,
		});

		// Обновляем статистику
		if (isTopicChanged) {
			// Уменьшаем счетчики в старой теме
			await prisma.topicStats.update({
				where: { topicId: oldQuestion.topicId },
				data: {
					totalQuestions: { decrement: 1 },
					...(oldQuestion.success && {
						completedQuestions: { decrement: 1 },
					}),
				},
			});

			// Увеличиваем счетчики в новой теме
			await prisma.topicStats.upsert({
				where: { topicId: newTopicId },
				update: {
					totalQuestions: { increment: 1 },
					...(newSuccess && {
						completedQuestions: { increment: 1 },
					}),
				},
				create: {
					topicId: newTopicId,
					totalQuestions: 1,
					completedQuestions: newSuccess ? 1 : 0,
				},
			});
		} else if (isSuccessChanged) {
			// Обновляем только completedQuestions в той же теме
			await prisma.topicStats.update({
				where: { topicId: oldQuestion.topicId },
				data: {
					completedQuestions: {
						increment: newSuccess ? 1 : -1,
					},
				},
			});
		}

		return NextResponse.json(updatedQuestion);
	} catch (error) {
		console.log("[QUESTION_PATCH] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось обновить вопрос" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ questionId: string }> },
) {
	try {
		const { topicId } = await req.json();
		const { questionId } = await params;
		const numericQuestionId = Number(questionId);
		const numericTopicId = Number(topicId);

		const question = await prisma.question.findUnique({
			where: { id: numericQuestionId },
			select: { success: true },
		});

		if (!question) {
			throw new Error("Вопрос не найден");
		}

		// используется executeRaw, потому что с обычным обращаением через prisma на бесплатном тарифе все висит долго, с одним запросом ок
		await prisma.$executeRaw`
			WITH deleted AS (
				DELETE FROM "questions" WHERE id = ${numericQuestionId}
				RETURNING success
			)
			UPDATE "topic_stats"
			SET
				"totalQuestions" = "totalQuestions" - 1,
				"completedQuestions" = "completedQuestions" - (SELECT success::int FROM deleted)
			WHERE "topicId" = ${numericTopicId}
		`;

		return NextResponse.json({ message: "Вопрос успешно удален" });
	} catch (error) {
		console.log("[QUESTION_DELETE] Server error", error);
		return NextResponse.json(
			{ message: "Не удалось удалить вопрос" },
			{ status: 500 },
		);
	}
}

// export async function PATCH(
// 	req: NextRequest,
// 	{ params }: { params: Promise<{ questionId: string }> },
// ) {
// 	try {
// 		const { questionId } = await params;
// 		const { fields } = await req.json();
// 		const numericQuestionId = Number(questionId);

// 		const oldQuestion = await prisma.question.findUnique({
// 			where: { id: numericQuestionId },
// 			select: { topicId: true, success: true },
// 		});

// 		if (!oldQuestion) {
// 			throw new Error("Вопрос не найден");
// 		}

// 		const newTopicId = fields.topicId ?? oldQuestion.topicId;
// 		const newSuccess = fields.success ?? oldQuestion.success;

// 		const isTopicChanged = newTopicId !== oldQuestion.topicId;
// 		const isSuccessChanged =
// 			fields.success !== undefined && newSuccess !== oldQuestion.success;

// 		const updatedQuestion = await prisma.$transaction(
// 			async (prisma) => {
// 				const question = await prisma.question.update({
// 					where: { id: numericQuestionId },
// 					data: fields,
// 				});

// 				if (isTopicChanged) {
// 					await prisma.topicStats.update({
// 						where: { topicId: oldQuestion.topicId },
// 						data: {
// 							totalQuestions: { decrement: 1 },
// 							...(oldQuestion.success && {
// 								completedQuestions: { decrement: 1 },
// 							}),
// 						},
// 					});

// 					await prisma.topicStats.upsert({
// 						where: { topicId: newTopicId },
// 						update: {
// 							totalQuestions: { increment: 1 },
// 							...(newSuccess && {
// 								completedQuestions: { increment: 1 },
// 							}),
// 						},
// 						create: {
// 							topicId: newTopicId,
// 							totalQuestions: 1,
// 							completedQuestions: newSuccess ? 1 : 0,
// 						},
// 					});
// 				} else if (isSuccessChanged) {
// 					await prisma.topicStats.update({
// 						where: { topicId: oldQuestion.topicId },
// 						data: {
// 							completedQuestions: {
// 								increment: newSuccess ? 1 : -1,
// 							},
// 						},
// 					});
// 				}

// 				return question;
// 			},
// 			{
// 				timeout: 15000,
// 			},
// 		);

// 		return NextResponse.json(updatedQuestion);
// 	} catch (error) {
// 		console.log("[QUESTION_PATCH] Server error", error);

// 		return NextResponse.json(
// 			{ message: "Не удалось обновить вопрос" },
// 			{ status: 500 },
// 		);
// 	}
// }

// export async function DELETE(
// 	req: NextRequest,
// 	{ params }: { params: Promise<{ questionId: string }> },
// ) {
// 	try {
// 		const { topicId } = await req.json();
// 		const { questionId } = await params;

// 		await prisma.$transaction(
// 			async (prisma) => {
// 				const question = await prisma.question.findUnique({
// 					where: { id: Number(questionId) },
// 					select: { success: true },
// 				});

// 				if (!question) {
// 					throw new Error("Вопрос не найден");
// 				}

// 				await prisma.question.delete({
// 					where: { id: Number(questionId) },
// 				});

// 				await prisma.topicStats.update({
// 					where: { topicId: Number(topicId) },
// 					data: {
// 						totalQuestions: {
// 							decrement: 1,
// 						},
// 						...(question.success && {
// 							completedQuestions: {
// 								decrement: 1,
// 							},
// 						}),
// 					},
// 				});
// 			},
// 			{
// 				timeout: 15000,
// 			},
// 		);

// 		return NextResponse.json({ message: "Вопрос успешно удален" });
// 	} catch (error) {
// 		console.log("[QUESTION_DELETE] Server error", error);

// 		return NextResponse.json(
// 			{ message: "Не удалось удалить вопрос" },
// 			{ status: 500 },
// 		);
// 	}
// }
