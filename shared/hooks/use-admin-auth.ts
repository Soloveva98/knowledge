import React from "react";

import { verifyAdminPassword } from "@/app/actions";
import { useAuthStore, useModalStore } from "../store";
import { getErrorToast, getSuccessToast } from "../utils/get-toast";
import { appText } from "../constants/app-text";

interface ReturnObject {
	isAdmin: boolean;
	isLoading: boolean;
	requestAccess: (onSuccess: () => void) => void;
	submitPassword: (password: string) => Promise<boolean>;
	logout: () => void;
}

export const useAdminAuth = (): ReturnObject => {
	const {
		isAdmin,
		isLoading,
		checkStatus,
		logout: storeLogout,
	} = useAuthStore();
	const { openPasswordModal, closeModals } = useModalStore();
	const { accessSuccess, accessError, logoutSuccess } = appText;

	const requestAccess = (onSuccess: () => void) => {
		if (isAdmin) {
			onSuccess();
		} else {
			openPasswordModal();
		}
	};

	const submitPassword = async (password: string): Promise<boolean> => {
		const formData = new FormData();
		formData.append("password", password);
		console.log("password", password);
		console.log("formData", formData);

		const result = await verifyAdminPassword(formData);
		console.log("result", result);

		if (result.success) {
			await checkStatus();
			closeModals();
			getSuccessToast(accessSuccess);

			return true;
		}

		getErrorToast((result.error as Error).message || accessError);

		return false;
	};

	const logout = async () => {
		await storeLogout();
		getSuccessToast(logoutSuccess);
	};

	return {
		isAdmin,
		isLoading,
		requestAccess,
		submitPassword,
		logout,
	};
};
