"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";

interface Props {
	id: number;
	topicId: number;
	success: boolean;
	title: string;
}

export const QuestionCard: React.FC<Props> = ({
	id,
	topicId,
	success,
	title,
}) => {
	return (
		<Link
			href={`/topic/${topicId}/question/${id}`}
			className={cn(
				"flex justify-center items-center text-center py-2 px-5 rounded-2xl cursor-pointer",
				success ? "bg-success" : "bg-bg-primary",
				"max-sm:text-[12px] max-sm:px-3",
			)}
		>
			{title}
		</Link>
	);
};
