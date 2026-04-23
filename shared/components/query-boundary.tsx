"use client";

import React from "react";

import { ErrorMessage } from "./error-message";
import { Loader, NotFound } from ".";
import { appText } from "../constants/app-text";

interface Props<T> {
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	data: T | undefined;
	isNotData: boolean;
	loadingComponent?: React.ReactNode;
	errorDefaultText?: string;
	notFoundText?: string;
	children: (data: T) => React.ReactNode;
}

export const QueryBoundary = <T,>({
	isLoading,
	isError,
	error,
	data,
	isNotData,
	children,
	loadingComponent = (
		<div className="flex justify-center items-center mt-12.5">
			<Loader />
		</div>
	),
	errorDefaultText = appText.dataNotFound,
	notFoundText = appText.dataNotFound,
}: Props<T>) => {
	if (isLoading) return loadingComponent;

	if (isError) {
		return (
			<ErrorMessage
				errorMessage={error?.message as string}
				defaultErrorText={errorDefaultText}
			/>
		);
	}

	if (isNotData) return <NotFound text={notFoundText} />;

	return <>{children(data as T)}</>;
};
