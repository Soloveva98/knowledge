"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Question } from "../../types/types";
import {
	QueryBoundary,
	QuestionCard,
	SkeletonForScreen,
	TopBar,
	TopicStats,
} from "..";
import { Api } from "../../services/api-client";
import { useModalStore } from "../../store";
import { useAdminAuth, useToggleStatus } from "@/shared/hooks";
import { appText } from "@/shared/constants/app-text";

interface Props {
	topicId: number;
}

export const Topic: React.FC<Props> = ({ topicId }) => {
	const { openTopicModal, openDeleteTopicModal, openPasswordModal } =
		useModalStore();
	const {
		isAdmin,
		isLoading: isLoadingAccess,
		requestAccess,
	} = useAdminAuth();
	const {
		topicStatusUpdated,
		topicStatusNotUpdated,
		topicNotFound,
		backToTopics,
	} = appText;

	const {
		data: topic,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["topic", topicId],
		queryFn: () => Api.topics.get(topicId),
		// staleTime: 0,
	});

	const toggleMutation = useToggleStatus({
		invalidateKeys: [["topic", topicId], ["topics"]],
		successMessage: topicStatusUpdated,
		errorMessage: topicStatusNotUpdated,
		mutationFn: () =>
			Api.topics.update(topicId, {
				success: !topic?.success,
			}),
	});

	const handleSuccessClick = () => {
		requestAccess(() => toggleMutation.mutate());
	};

	const handleEditClick = () => {
		requestAccess(() => openTopicModal(topicId));
	};

	const handleTrashClick = () => {
		requestAccess(() => openDeleteTopicModal(topicId));
	};

	return (
		<QueryBoundary
			isLoading={isLoading}
			isError={isError}
			error={error}
			isNotData={!topic}
			data={topic}
			loadingComponent={<SkeletonForScreen />}
			errorDefaultText={topicNotFound}
			notFoundText={topicNotFound}
		>
			{({ success, name, stats, questions }) => (
				<div>
					<TopBar
						backText={backToTopics}
						topicSuccess={success}
						isBlocked={!isAdmin}
						isLoadingAccess={isLoadingAccess}
						onSuccessClick={handleSuccessClick}
						onEditClick={handleEditClick}
						onTrashClick={handleTrashClick}
						onBlockClick={openPasswordModal}
					/>

					<h2 className="text-center text-2xl mt-6 max-sm:text-xl max-sm:mt-3">
						{name}
					</h2>

					<TopicStats
						stats={stats}
						className="text-[12px] max-sm:text-[10px]"
					/>

					<ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mt-7.5 max-sm:gap-1.5 max-sm:mt-4">
						{questions.map((question: Question) => (
							<QuestionCard
								key={question.id}
								id={question.id}
								topicId={topicId}
								success={question.success}
								title={question.title}
							/>
						))}
					</ul>
				</div>
			)}
		</QueryBoundary>
	);
};
