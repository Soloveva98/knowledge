import React from "react";
import { cn } from "@/shared/utils/utils";

interface Props {
	children: React.ReactNode;
	onClick: () => void;
	isActive?: boolean;
	disabled?: boolean;
	title?: string;
}

export const ToolbarButton: React.FC<Props> = ({
	isActive,
	children,
	onClick,
	disabled,
	title,
}) => {
	return (
		<button
			className={cn(
				"p-1 rounded-md transition-colors text-primary",
				isActive
					? "bg-gray-300 text-accent"
					: "bg-white hover:bg-gray-200",
				disabled && "opacity-50 cursor-not-allowed",
			)}
			type="button"
			title={title}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
