import { create } from "zustand";
import { UrlModalType } from "../types/types";

interface ModalState {
	isTopicModalOpen: boolean;
	isQuestionModalOpen: boolean;
	isDeleteTopicModalOpen: boolean;
	isDeleteQuestionModalOpen: boolean;
	isPasswordModalOpen: boolean;
	isUrlModalOpen: boolean;

	editingTopicId: number | null;
	editingQuestionId: number | null;

	onUrlConfirm: ((url: string) => void) | null;
	currentUrl: string;

	openTopicModal: (topicId?: number) => void;
	openQuestionModal: (topicId?: number, questionId?: number) => void;
	openDeleteTopicModal: (topicId: number) => void;
	openDeleteQuestionModal: (topicId: number, questionId: number) => void;
	openPasswordModal: (onSuccess?: () => void) => void;
	openUrlModal: (
		onConfirm: (url: string) => void,
		currentUrl?: string,
	) => void;

	closeModals: () => void;
	closeUrlModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isTopicModalOpen: false,
	isQuestionModalOpen: false,
	isDeleteTopicModalOpen: false,
	isDeleteQuestionModalOpen: false,
	isPasswordModalOpen: false,
	isUrlModalOpen: false,

	editingTopicId: null,
	editingQuestionId: null,

	onUrlConfirm: null,
	currentUrl: "",

	openTopicModal: (topicId?: number) =>
		set({ isTopicModalOpen: true, editingTopicId: topicId || null }),

	openQuestionModal: (topicId?: number, questionId?: number) =>
		set({
			isQuestionModalOpen: true,
			editingTopicId: topicId || null,
			editingQuestionId: questionId || null,
		}),

	openDeleteTopicModal: (topicId: number) => {
		set({
			isDeleteTopicModalOpen: true,
			editingTopicId: topicId,
		});
	},

	openDeleteQuestionModal: (topicId: number, questionId: number) => {
		set({
			isDeleteQuestionModalOpen: true,
			editingTopicId: topicId,
			editingQuestionId: questionId,
		});
	},

	openPasswordModal: () => set({ isPasswordModalOpen: true }),

	openUrlModal: (onConfirm, currentUrl = "") => {
		set({
			isUrlModalOpen: true,
			onUrlConfirm: onConfirm,
			currentUrl,
		});
	},

	closeModals: () =>
		set({
			isTopicModalOpen: false,
			isQuestionModalOpen: false,
			isDeleteTopicModalOpen: false,
			isDeleteQuestionModalOpen: false,
			isPasswordModalOpen: false,
			editingTopicId: null,
			editingQuestionId: null,
		}),

	closeUrlModal: () =>
		set({
			isUrlModalOpen: false,
			onUrlConfirm: null,
			currentUrl: "",
		}),
}));
