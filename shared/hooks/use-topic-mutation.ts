import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "../services/api-client";
import { getErrorToast, getSuccessToast } from "../utils/get-toast";
import { appText } from "../constants/app-text";

interface Props {
	name: string;
	setName: (name: string) => void;
	closeModals: () => void;
	editingTopicId?: number | null;
}

export const useTopicMutation = ({
	name,
	editingTopicId,
	setName,
	closeModals,
}: Props) => {
	const queryClient = useQueryClient();
	const { topicUpdated, topicAdded } = appText;

	return useMutation({
		mutationFn: async () => {
			return editingTopicId
				? Api.topics.update(editingTopicId, { name })
				: Api.topics.add(name);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["topics"] });

			if (editingTopicId) {
				queryClient.invalidateQueries({
					queryKey: ["topic", editingTopicId],
				});
			}

			getSuccessToast(editingTopicId ? topicUpdated : topicAdded);

			closeModals();
			setName("");
		},
		onError: () => {
			getErrorToast();
		},
	});
};
