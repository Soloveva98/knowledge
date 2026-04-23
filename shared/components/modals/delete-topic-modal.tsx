"use client";

import React from "react";

import { Api } from "@/shared/services/api-client";
import { useModalStore } from "@/shared/store/modal-store";
import { DeleteModal } from "./delete-modal";
import { appText } from "@/shared/constants/app-text";

export const DeleteTopicModal: React.FC = () => {
	const { isDeleteTopicModalOpen, editingTopicId, closeModals } =
		useModalStore();
	const { topicDeleteQuestion, topicDeleted, topicNotDeleted } = appText;

	if (!isDeleteTopicModalOpen) {
		return null;
	}

	return (
		<DeleteModal
			title={topicDeleteQuestion}
			invalidateKey={["topics"]}
			successMessage={topicDeleted}
			errorMessage={topicNotDeleted}
			closeModals={closeModals}
			mutationFn={() => {
				return Api.topics.deleteTopic(editingTopicId as number);
			}}
		/>
	);
};
