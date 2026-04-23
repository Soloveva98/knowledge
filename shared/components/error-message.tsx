"use client";

import React from "react";
import { appText } from "../constants/app-text";

interface Props {
	errorMessage: string;
	defaultErrorText?: string;
}

export const ErrorMessage: React.FC<Props> = ({
	errorMessage,
	defaultErrorText,
}) => {
	return (
		<div className="text-center text-error flex flex-col items-center gap-3 mt-6">
			<span className="text-5xl">😳</span>
			<span className="mt3 font-medium text-xl">
				{appText.error}: {errorMessage || defaultErrorText}
			</span>
		</div>
	);
};
