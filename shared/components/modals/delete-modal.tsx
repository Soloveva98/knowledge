"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ModalTop } from "./modal-top";
import { ModalActions } from "./modal-actions";
import { getErrorToast, getSuccessToast } from "@/shared/utils/get-toast";
import { appText } from "@/shared/constants/app-text";
import { Question, Topic } from "@/shared/types/types";

interface Props {
	title: string;
	invalidateKey: (string | number)[];
	successMessage: string;
	errorMessage: string;
	closeModals: () => void;
	mutationFn: () => Promise<Question | Topic>;
	backUrl?: string;
}

export const DeleteModal: React.FC<Props> = ({
	title,
	invalidateKey,
	successMessage,
	errorMessage,
	closeModals,
	mutationFn,
	backUrl = "/",
}) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: invalidateKey,
			});
			getSuccessToast(successMessage);
			closeModals();
			router.push(backUrl);
		},
		onError: () => {
			getErrorToast(errorMessage);
		},
	});

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
			onClick={closeModals}
		>
			<div
				className="bg-white rounded-2xl p-6 w-full max-w-xl max-sm:p-4 max-sm:max-w-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<ModalTop titleText={title} closeModals={closeModals} />

				<ModalActions
					isPending={mutation.isPending}
					closeModals={closeModals}
					onSubmit={() => mutation.mutate()}
					submitText={appText.delete}
				/>
			</div>
		</div>
	);
};
