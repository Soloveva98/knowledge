"use client";

import React from "react";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
	text?: string;
	fallbackUrl?: string;
}

export const BackButton: React.FC<Props> = ({ text, fallbackUrl = "/" }) => {
	const router = useRouter();

	const handleBack = () => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push(fallbackUrl);
		}
	};

	return (
		<button
			onClick={handleBack}
			className="bg-transparent text-accent p-0 flex items-center gap-3 font-medium hover:transform-none group max-sm:text-[12px] max-sm:gap-1.5"
		>
			<MoveLeft
				size={22}
				color="#00484d"
				className="transition-all duration-200 ease-in-out group-hover:-translate-x-0.5 max-sm:w-[16px]"
			/>
			<span>{text}</span>
		</button>
	);
};
