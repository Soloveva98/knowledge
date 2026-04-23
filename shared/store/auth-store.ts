import { checkAdminStatus, logoutAdmin } from "@/app/actions";
import { create } from "zustand";

interface AuthState {
	isAdmin: boolean;
	isLoading: boolean;
	checkStatus: () => Promise<void>;
	logout: () => Promise<void>;
	setAdmin: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAdmin: false,
	isLoading: false,

	setAdmin: (status: boolean) => set({ isAdmin: status }),

	checkStatus: async () => {
		try {
			set({ isLoading: true });
			const { isAdmin } = await checkAdminStatus();
			set({ isAdmin });
		} catch (error) {
			console.log("error", error);
		} finally {
			set({ isLoading: false });
		}
	},

	logout: async () => {
		try {
			set({ isLoading: true });
			await logoutAdmin();
			set({ isAdmin: false });
		} catch (error) {
			console.log("error", error);
		} finally {
			set({ isLoading: false });
		}
	},
}));
