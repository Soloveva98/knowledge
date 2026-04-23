"use client";

import React, { useEffect, useState } from "react";

import { ModalTop } from "./modal-top";
import { ModalActions } from "./modal-actions";
import { appText } from "@/shared/constants/app-text";
import { useModalStore } from "@/shared/store";

export const UrlModal: React.FC = () => {
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");
	const { isUrlModalOpen, closeUrlModal, onUrlConfirm, currentUrl } =
		useModalStore();

	useEffect(() => {
		if (isUrlModalOpen) {
			setUrl(currentUrl);
			setError("");
		}
	}, [isUrlModalOpen, currentUrl]);

	const handleSubmit = () => {
		if (!url.trim()) {
			setError("Пожалуйста, введите URL");

			return;
		}

		const isValidUrl = (urlString: string) => {
			try {
				// Пробуем создать объект URL
				const urlObj = new URL(urlString);
				// Проверяем, что протокол http или https
				return (
					urlObj.protocol === "http:" || urlObj.protocol === "https:"
				);
			} catch {
				return false;
			}
		};

		if (!isValidUrl(url.trim())) {
			setError(
				"Пожалуйста, введите корректный URL (начинающийся с http:// или https://)",
			);
			return;
		}

		if (onUrlConfirm) {
			onUrlConfirm(url.trim());
		}

		closeUrlModal();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}

		if (e.key === "Escape") {
			closeUrlModal();
		}
	};

	if (!isUrlModalOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
			onClick={closeUrlModal}
		>
			<div
				className="bg-white rounded-2xl p-6 w-full max-w-md max-sm:p-4 max-sm:max-w-sm"
				onClick={(e) => e.stopPropagation()}
			>
				<ModalTop titleText="Введите URL" closeModals={closeUrlModal} />

				<div className="mb-4">
					<input
						type="text"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
							setError("");
						}}
						onKeyDown={handleKeyDown}
						placeholder="https://example.com"
						className="w-full max-sm:text-xs max-sm:mb-0"
						autoFocus
					/>

					{error && (
						<p className="text-red-500 text-sm mt-2">* {error}</p>
					)}
				</div>

				<ModalActions
					isPending={false}
					closeModals={closeUrlModal}
					onSubmit={handleSubmit}
					submitText={appText.save}
					disabled={!url.trim()}
				/>
			</div>
		</div>
	);
};
