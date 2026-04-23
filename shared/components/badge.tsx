import React from "react";
import { cn } from "../utils/utils";

interface Props {
	text: string;
	className?: string;
}

export const Badge: React.FC<Props> = ({ text, className }) => {
	return (
		<p
			className={cn(
				"my-3 bg-bg-secondary rounded-lg text-accent px-3 py-1 font-me inline-flex justify-center items-center",
				className,
				"max-sm:px-2 max-sm:py-0.5",
			)}
		>
			{text.toLowerCase()}
		</p>
	);
};
