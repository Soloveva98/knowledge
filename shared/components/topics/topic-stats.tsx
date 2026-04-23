"use client";

import React from "react";

import { TopicStats as Stats } from "../../types/types";
import { cn } from "../../utils/utils";
import { appText } from "@/shared/constants/app-text";

interface Props {
	stats: Stats;
	className?: string;
}

export const TopicStats: React.FC<Props> = ({ stats, className }) => {
	return (
		<p className={cn("font-medium text-secondary text-center", className)}>
			{`(${stats.completedQuestions} ${appText.from} ${stats.totalQuestions})`}
		</p>
	);
};
