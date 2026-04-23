"use client";

import React, { useState, useEffect } from "react";

import { Api } from "@/shared/services/api-client";
import { useModalStore } from "@/shared/store/modal-store";
import { ModalTop } from "./modal-top";
import { ModalActions } from "./modal-actions";
import { getErrorToast } from "@/shared/utils/get-toast";
import { useTopicMutation } from "@/shared/hooks";
import { appText } from "@/shared/constants/app-text";

export const AddEditTopicModal: React.FC = () => {
	const [name, setName] = useState("");
	const { isTopicModalOpen, editingTopicId, closeModals } = useModalStore();
	const { enterNameTopic, editTopic, addTopic, topicName } = appText;

	useEffect(() => {
		if (editingTopicId && isTopicModalOpen) {
			const loadTopic = async () => {
				const topic = await Api.topics.get(editingTopicId);
				topic && setName(topic.name);
			};

			loadTopic();
		} else {
			setName("");
		}
	}, [editingTopicId, isTopicModalOpen]);

	const mutation = useTopicMutation({
		name,
		setName,
		closeModals,
		editingTopicId,
	});

	const handleSubmit = () => {
		if (!name.trim()) {
			getErrorToast(enterNameTopic);

			return;
		}

		mutation.mutate();
	};

	if (!isTopicModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
			onClick={closeModals}
		>
			<div
				className="bg-white rounded-2xl p-6 w-full max-w-xl scrollbar overflow-y-auto max-sm:p-4 max-sm:max-w-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<ModalTop
					titleText={editingTopicId ? editTopic : addTopic}
					closeModals={closeModals}
				/>

				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={topicName}
					className="w-full max-sm:text-[12px]"
					autoFocus
				/>

				<ModalActions
					disabled={!name.trim() || mutation.isPending}
					isPending={mutation.isPending}
					closeModals={closeModals}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};
