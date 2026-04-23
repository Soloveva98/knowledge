import React from "react";
import { LoaderButton } from "..";
import { appText } from "@/shared/constants/app-text";

interface Props {
	isPending: boolean;
	closeModals: () => void;
	onSubmit: () => void;
	disabled?: boolean;
	submitText?: string;
}

export const ModalActions: React.FC<Props> = ({
	disabled,
	isPending,
	closeModals,
	onSubmit,
	submitText = appText.save,
}) => {
	return (
		<div className="flex justify-end gap-2 mt-10 flex-wrap max-sm:mt-7">
			<button
				onClick={closeModals}
				className="btn-transparent border px-4 py-2 text-secondary hover:text-gray-800 max-sm:text-[12px] max-sm:px-2 max-sm:py-1.5"
			>
				{appText.cancel}
			</button>

			<button
				onClick={onSubmit}
				disabled={disabled}
				className="min-w-[115px] px-4 py-2 hover:bg-accent-dark disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none max-sm:text-[12px] max-sm:px-2 max-sm:py-1.5"
			>
				{isPending ? <LoaderButton /> : submitText}
			</button>
		</div>
	);
};
