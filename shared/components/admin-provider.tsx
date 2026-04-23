"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../store";

interface Props {
	children: React.ReactNode;
}

export const AdminProvider: React.FC<Props> = ({ children }) => {
	const { checkStatus } = useAuthStore();

	useEffect(() => {
		checkStatus();
	}, [checkStatus]);

	return <>{children}</>;
};
