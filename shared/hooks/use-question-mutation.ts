import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "../services/api-client";
import { getErrorToast, getSuccessToast } from "../utils/get-toast";
import { appText } from "../constants/app-text";

interface Props {
	title: string;
	text: string;
	closeModals: () => void;
	editingQuestionId?: number | null;
	editingTopicId?: number | null;
	selectedTopicId?: number | null;
}

export const useQuestionMutation = ({
	editingQuestionId,
	editingTopicId,
	selectedTopicId,
	title,
	text,
	closeModals,
}: Props) => {
	const queryClient = useQueryClient();
	const { questionUpdated, questionAdded } = appText;

	return useMutation({
		mutationFn: async () => {
			return editingQuestionId
				? Api.question.update(editingQuestionId, {
						topicId: selectedTopicId as number,
						title,
						text,
					})
				: Api.question.add({
						title,
						text,
						topicId: selectedTopicId as number,
					});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["topic", selectedTopicId],
			});

			if (editingQuestionId) {
				queryClient.invalidateQueries({
					queryKey: ["question", editingQuestionId],
				});

				queryClient.invalidateQueries({
					queryKey: ["topic", editingTopicId],
				});
			}

			queryClient.invalidateQueries({ queryKey: ["topics"] });

			getSuccessToast(
				editingQuestionId ? questionUpdated : questionAdded,
			);

			closeModals();
		},
		onError: (error: Error) => {
			getErrorToast(error.message);
		},
	});
};
