"use client";

import React from "react";
import { cn } from "../utils/utils";

interface Props {
	className?: string;
}

export const SkeletonCard: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				"bg-[#e2e8f0] relative overflow-hidden cursor-wait pointer-none rounded-2xl hover:transform-none",
				className
			)}
		>
			<div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
		</div>
	);
};
