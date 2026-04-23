import React from "react";
import { X } from "lucide-react";

interface Props {
	titleText: string;
	closeModals: () => void;
}

export const ModalTop: React.FC<Props> = ({ titleText, closeModals }) => {
	return (
		<div className="flex justify-between gap-2 items-start">
			<h3 className="text-xl font-bold mb-6 max-sm:text-lg max-sm:mb-4">{titleText}</h3>

			<button className="btn-transparent p-0" onClick={closeModals}>
				<X size={22} className="max-sm:w-[18px]" />
			</button>
		</div>
	);
};
