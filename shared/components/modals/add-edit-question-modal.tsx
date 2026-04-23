"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Api } from "@/shared/services/api-client";
import { useModalStore } from "@/shared/store/modal-store";
import { EditorTextarea, Loader, Select } from "..";
import { ModalTop } from "./modal-top";
import { ModalActions } from "./modal-actions";
import { getErrorToast } from "@/shared/utils/get-toast";
import { useQuestionMutation } from "@/shared/hooks";
import { appText } from "@/shared/constants/app-text";

export const AddEditQuestionModal: React.FC = () => {
	const {
		isQuestionModalOpen,
		editingTopicId,
		editingQuestionId,
		closeModals,
	} = useModalStore();
	const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const {
		enterQuestionTitle,
		enterQuestionText,
		enterQuestionTopic,
		editQuestion,
		addQuestion,
		questionTitle,
		questionText,
	} = appText;

	const { data: question, isLoading } = useQuery({
		queryKey: ["question", editingQuestionId],
		queryFn: () => Api.question.get(editingQuestionId as number),
		enabled: !!editingQuestionId && isQuestionModalOpen,
	});

	useEffect(() => {
		if (question) {
			setTitle(question.title);
			setText(question.text);
			setSelectedTopicId(question.topicId);
		}
	}, [question]);

	useEffect(() => {
		if (!isQuestionModalOpen) {
			setTitle("");
			setText("");
			setSelectedTopicId(null);
		} else if (!editingQuestionId && editingTopicId) {
			setSelectedTopicId(editingTopicId);
		}
	}, [isQuestionModalOpen, editingQuestionId, editingTopicId]);

	const mutation = useQuestionMutation({
		editingQuestionId,
		editingTopicId,
		selectedTopicId,
		title,
		text,
		closeModals,
	});

	const handleSubmit = () => {
		if (!title.trim()) {
			getErrorToast(enterQuestionTitle);

			return;
		}

		if (!text.trim()) {
			getErrorToast(enterQuestionText);

			return;
		}

		if (!editingQuestionId && !selectedTopicId) {
			getErrorToast(enterQuestionTopic);

			return;
		}

		mutation.mutate();
	};

	if (!isQuestionModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
			onClick={closeModals}
		>
			<div
				className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto scrollbar max-sm:p-4 max-sm:max-w-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<ModalTop
					titleText={editingQuestionId ? editQuestion : addQuestion}
					closeModals={closeModals}
				/>

				{isLoading && !!editingQuestionId ? (
					<div className="flex justify-center py-12">
						<Loader />
					</div>
				) : (
					<>
						<Select
							value={selectedTopicId}
							getOptions={Api.topics.getAll}
							onChange={setSelectedTopicId}
						/>

						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder={questionTitle}
							className="w-full my-3 max-sm:text-xs max-sm:my-2"
						/>

						<EditorTextarea
							value={text}
							onChange={(newHtml) => setText(newHtml)}
							placeholder={questionText}
						/>

						<ModalActions
							disabled={
								mutation.isPending ||
								(isLoading && !!editingQuestionId) ||
								!title.trim() ||
								!text.trim() ||
								!selectedTopicId
							}
							isPending={mutation.isPending}
							closeModals={closeModals}
							onSubmit={handleSubmit}
						/>
					</>
				)}
			</div>
		</div>
	);
};
