"use client";

import React from "react";

import { BackButton } from "./back-button";
import { appText } from "../constants/app-text";

interface Props {
	text?: string;
}

export const NotFound: React.FC<Props> = ({
	text = appText.contentNotFound,
}) => {
	return (
		<div className="mt-6 text-center flex flex-col gap-3 justify-center items-center">
			<span className="text-5xl">😢</span>
			<h3 className="font-medium text-xl mt-3">{text}</h3>
			<BackButton text={appText.goBack} />
		</div>
	);
};
