"use client";

import React from "react";
import Link from "next/link";

import { TopicStats as StatsType } from "../../types/types";
import { ProgressBar, TopicStats } from "..";
import { cn } from "@/shared/utils/utils";

interface Props {
	id: number;
	success: boolean;
	name: string;
	stats: StatsType;
}

export const TopicCard: React.FC<Props> = ({ id, success, name, stats }) => {
	return (
		<Link
			href={`/topic/${id}`}
			className={cn(
				"`block text-center py-2 px-5 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5",
				success ? "bg-success" : "bg-bg-primary",
				"max-sm:text-[12px] max-sm:px-3",
			)}
		>
			<p>{name}</p>

			<TopicStats stats={stats} className="text-[10px] mt-1/2 mb-2" />

			<ProgressBar
				totalCount={stats.totalQuestions}
				completedCount={stats.completedQuestions}
			/>
		</Link>
	);
};
