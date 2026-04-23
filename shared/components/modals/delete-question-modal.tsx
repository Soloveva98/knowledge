"use client";

import React from "react";

import { Api } from "@/shared/services/api-client";
import { useModalStore } from "@/shared/store/modal-store";
import { DeleteModal } from "./delete-modal";
import { appText } from "@/shared/constants/app-text";

export const DeleteQuestionModal: React.FC = () => {
	const {
		isDeleteQuestionModalOpen,
		editingTopicId,
		editingQuestionId,
		closeModals,
	} = useModalStore();
	const { questionDeleteQuestion, questionDeleted, questionNotDeleted } = appText;

	if (!isDeleteQuestionModalOpen) {
		return null;
	}

	return (
		<DeleteModal
			title={questionDeleteQuestion}
			invalidateKey={["topic", editingTopicId as number]}
			successMessage={questionDeleted}
			errorMessage={questionNotDeleted}
			closeModals={closeModals}
			mutationFn={() => {
				return Api.question.deleteQuestion(
					editingTopicId as number,
					editingQuestionId as number,
				);
			}}
			backUrl={`/topic/${editingTopicId}`}
		/>
	);
};
