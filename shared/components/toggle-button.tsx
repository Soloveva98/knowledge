"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface Props {
	success: boolean;
	onClick: () => void;
	successText?: string;
	unsuccessText?: string;
	isWithText?: boolean;
}

export const ToggleButton: React.FC<Props> = ({
	success,
	onClick,
	successText,
	unsuccessText,
	isWithText = false,
}) => {
	return (
		<button
			className="btn-transparent flex items-center gap-1 max-sm:p-0"
			onClick={onClick}
			title={success ? unsuccessText : successText}
		>
			{success ? (
				<X color="#00484d" className="max-sm:w-[18px]" />
			) : (
				<Check className="max-sm:w-[18px]" color="#00484d" />
			)}
			{isWithText && <span>{success ? unsuccessText : successText}</span>}
		</button>
	);
};
