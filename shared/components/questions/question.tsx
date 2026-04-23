"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Api } from "../../services/api-client";
import { useModalStore } from "../../store";
import { Badge, QueryBoundary, TopBar } from "..";
import { useAdminAuth, useToggleStatus } from "@/shared/hooks";
import { appText } from "@/shared/constants/app-text";

interface Props {
	topicId: number;
	topicName: string;
	questionId: number;
}

export const Question: React.FC<Props> = ({
	topicId,
	topicName,
	questionId,
}) => {
	const { openQuestionModal, openDeleteQuestionModal, openPasswordModal } =
		useModalStore();
	const {
		isAdmin,
		isLoading: isLoadingAccess,
		requestAccess,
	} = useAdminAuth();
	const {
		questionStatusUpdated,
		questionStatusNotUpdated,
		questionNotFoundAndRefresh,
		questionNotFound,
		backToQuestions,
	} = appText;

	const {
		data: question,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["question", questionId],
		queryFn: () => Api.question.get(questionId),
		staleTime: 1000 * 60,
		retry: 1,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
	});

	const toggleMutation = useToggleStatus({
		invalidateKeys: [
			["topic", topicId],
			["question", questionId],
			["topics"],
		],
		successMessage: questionStatusUpdated,
		errorMessage: questionStatusNotUpdated,
		mutationFn: () =>
			Api.question.update(questionId, {
				success: !question?.success,
			}),
	});

	const handleSuccessClick = () => {
		requestAccess(() => toggleMutation.mutate());
	};

	const handleEditClick = () => {
		requestAccess(() => openQuestionModal(topicId, questionId));
	};

	const handleTrashClick = () => {
		requestAccess(() => openDeleteQuestionModal(topicId, questionId));
	};

	return (
		<QueryBoundary
			isLoading={isLoading}
			isError={isError}
			error={error}
			isNotData={!question}
			data={question}
			errorDefaultText={questionNotFoundAndRefresh}
			notFoundText={questionNotFound}
		>
			{({ title, success, text }) => (
				<div className="max-xs:flex max-xs:flex-col max-xs:items-center">
					<TopBar
						backText={backToQuestions}
						topicSuccess={success}
						isBlocked={!isAdmin}
						isLoadingAccess={isLoadingAccess}
						onSuccessClick={handleSuccessClick}
						onEditClick={handleEditClick}
						onTrashClick={handleTrashClick}
						onBlockClick={openPasswordModal}
					/>

					<Badge
						text={`Тема: ${topicName}`}
						className="text-[12px] max-sm:text-[10px] max-sm:rounded-sm"
					/>

					<h2 className="mb-5 text-2xl max-sm:text-xl max-sm:mb-3">
						{title}
					</h2>

					<div
						className="prose max-w-none max-sm:text-xs"
						dangerouslySetInnerHTML={{ __html: text }}
					/>
				</div>
			)}
		</QueryBoundary>
	);
};
