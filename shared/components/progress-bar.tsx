"use client";

import React from "react";

interface Props {
	totalCount: number;
	completedCount: number;
}

export const ProgressBar: React.FC<Props> = ({
	totalCount,
	completedCount,
}) => {
	const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

	return (
		<div
			className="w-[50%] h-2 mx-auto rounded-2xl overflow-hidden shadow-inner max-sm:h-1.5"
			style={{ background: "#e8e0d5" }}
		>
			<div
				className="h-full rounded-2xl transition-all duration-300 ease-out"
				style={{
					width: `${progress}%`,
					background: `repeating-linear-gradient(
						45deg,
						#22c55e,
						#22c55e 12px,
						#16a34a 12px,
						#16a34a 24px
					)`,
					boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
				}}
			/>
		</div>
	);
};
