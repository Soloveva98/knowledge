"use client";

import React, { useState } from "react";

import { ModalTop } from "./modal-top";
import { ModalActions } from "./modal-actions";
import { useModalStore } from "@/shared/store";
import { useAdminAuth } from "@/shared/hooks";
import { appText } from "@/shared/constants/app-text";

export const AdminPasswordModal: React.FC = () => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { isPasswordModalOpen, closeModals } = useModalStore();
	const { isLoading, submitPassword } = useAdminAuth();
	const {
		incorrectPassword,
		accessToFunctionality,
		enterPasswordDescription,
		enterPassword,
		check,
	} = appText;

	const handleSubmit = async () => {
		if (!password.trim()) {
			setError(enterPassword);

			return;
		}

		setError("");

		const success = await submitPassword(password);

		if (!success) {
			setError(incorrectPassword);
			setPassword("");
		}
	};

	if (!isPasswordModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
			onClick={closeModals}
		>
			<div
				className="bg-white rounded-2xl p-6 w-full max-w-md scrollbar max-sm:p-4"
				onClick={(e) => e.stopPropagation()}
			>
				<ModalTop
					titleText={accessToFunctionality}
					closeModals={closeModals}
				/>

				<p className="text-gray-600 mb-4 text-sm max-sm:text-xs">
					{enterPasswordDescription}
				</p>

				<input
					type="password"
					placeholder={enterPassword}
					className="w-full mb-4 max-sm:text-xs max-sm:mb-0"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
				/>

				{error && (
					<p className="text-red-500 text-xs mt-1 mb-4 ml-1">
						* {error}
					</p>
				)}

				<ModalActions
					disabled={!password.trim()}
					isPending={isLoading}
					closeModals={closeModals}
					onSubmit={handleSubmit}
					submitText={check}
				/>
			</div>
		</div>
	);
};
