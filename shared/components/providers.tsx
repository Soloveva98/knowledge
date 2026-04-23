"use client";

import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
	AddEditTopicModal,
	DeleteTopicModal,
	DeleteQuestionModal,
	AddEditQuestionModal,
	AdminPasswordModal,
	AdminProvider,
	UrlModal,
} from ".";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 5 * 60 * 1000,
						gcTime: 1000 * 60 * 5,
						retry: 1,
						retryDelay: (attemptIndex) =>
							Math.min(1000 * 2 ** attemptIndex, 10000),
					},
				},
			}),
	);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AdminProvider>
					{children}
					<AddEditTopicModal />
					<AddEditQuestionModal />
					<DeleteTopicModal />
					<DeleteQuestionModal />
					<AdminPasswordModal />
					<UrlModal />
					<Toaster />
					<NextTopLoader />
				</AdminProvider>
			</QueryClientProvider>
		</>
	);
};
