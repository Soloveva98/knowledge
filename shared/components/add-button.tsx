"use client";

import React from "react";

import { Plus } from "lucide-react";
import { BlockOverlay } from "./block-overlay";
import { cn } from "../utils/utils";
import { appText } from "../constants/app-text";

interface Props {
	onClick: () => void;
	text?: string;
	isBlocked?: boolean;
}

export const AddButton: React.FC<Props> = ({
	text = appText.add,
	onClick,
	isBlocked = false,
}) => {
	return (
		<div className="relative">
			<button
				className={cn(
					"flex items-center gap-2 text-[12px]",
					isBlocked && "opacity-40",
					"max-sm:text-[10px] max-sm:px-3 max-sm:py-2 max-sm:gap-1",
				)}
				onClick={onClick}
			>
				<span>{text}</span>
				<Plus size={18} className="max-sm:w-[14px]" />
			</button>

			{isBlocked && <BlockOverlay onClick={onClick} />}
		</div>
	);
};
