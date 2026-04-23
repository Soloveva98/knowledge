import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getErrorToast, getSuccessToast } from "../utils/get-toast";

interface UseToggleStatusProps {
	invalidateKeys: (string | number)[][];
	successMessage: string;
	errorMessage: string;
	mutationFn: () => Promise<any>;
}

export const useToggleStatus = ({
	invalidateKeys,
	successMessage,
	errorMessage,
	mutationFn,
}: UseToggleStatusProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			invalidateKeys.forEach((key) => {
				queryClient.invalidateQueries({ queryKey: key });
			});
			getSuccessToast(successMessage);
		},
		onError: () => {
			getErrorToast(errorMessage);
		},
	});
};
