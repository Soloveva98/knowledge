"use client";

import React from "react";

import { SkeletonCard } from ".";

interface Props {
	text?: string;
	countCard?: number;
}

export const SkeletonForScreen: React.FC<Props> = ({ text, countCard = 8 }) => {
	return (
		<>
			<h2 className="text-center mb-7.5 text-2xl max-w-[235px] m-auto max-sm:text-xl max-xs:text-lg max-xs:mb-4">
				{text ? (
					text
				) : (
					<SkeletonCard className="min-h-[40px] max-sm:min-h-[32px]" />
				)}
			</h2>

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 max-sm:gap-2">
				{[...Array(countCard)].map((_, index) => (
					<SkeletonCard
						key={`skeleton-${index}`}
						className="min-h-[40px] max-sm:min-h-[32px]"
					/>
				))}
			</ul>
		</>
	);
};
