import React from "react";
import { Question } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";

interface Props {
	params: Promise<{ topicId: string; questionId: string }>;
}

export default async function QuestionPage({ params }: Props) {
	const { topicId, questionId } = await params;

	const topic = await prisma.topic.findUnique({
		where: {
			id: Number(topicId),
		},
	});

	return (
		<Question
			topicId={Number(topicId)}
			topicName={topic?.name ?? ""}
			questionId={Number(questionId)}
		/>
	);
}
