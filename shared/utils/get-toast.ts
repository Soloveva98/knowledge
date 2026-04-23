import toast from "react-hot-toast";

import { appText } from "../constants/app-text";

const { success, wasError } = appText;

export const getSuccessToast = (message: string = success) => {
	toast.error(message, { icon: "✅" });
};

export const getErrorToast = (message: string = wasError) => {
	toast.error(message, { icon: "❌" });
};
