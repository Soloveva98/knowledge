"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryBoundary, SkeletonForScreen, TopicCard } from "..";
import { Api } from "../../services/api-client";
import { Topic } from "../../types/types";
import { appText } from "@/shared/constants/app-text";

export const Topics: React.FC = () => {
	const {
		data: topics,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["topics"],
		queryFn: Api.topics.getAll,
		retry: 1,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
	});
	const { topicsOfQuestions, topicsNotFound } = appText;

	return (
		<QueryBoundary
			isLoading={isLoading}
			isError={isError}
			error={error}
			isNotData={!topics || topics.length === 0}
			data={topics}
			loadingComponent={
				<SkeletonForScreen text={topicsOfQuestions} countCard={12} />
			}
			errorDefaultText={topicsNotFound}
			notFoundText={topicsNotFound}
		>
			{(topicsData) => {
				return (
					<div>
						<h2 className="text-center mb-7.5 text-2xl max-sm:text-xl max-xs:text-lg max-xs:mb-4">
							{topicsOfQuestions}
						</h2>

						<ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 max-sm:gap-1.5">
							{topicsData.map(
								({ id, name, success, stats }: Topic) => (
									<TopicCard
										key={id}
										id={id}
										success={success}
										name={name}
										stats={stats}
									/>
								),
							)}
						</ul>
					</div>
				);
			}}
		</QueryBoundary>
	);
};
