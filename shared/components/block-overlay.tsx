import React from "react";
import { Lock } from "lucide-react";
import { cn } from "../utils/utils";

interface Props {
	onClick: () => void;
	className?: string;
}

export const BlockOverlay: React.FC<Props> = ({ onClick, className }) => {
	return (
		<div
			className={cn(
				"absolute inset-0 flex items-center justify-center cursor-pointer bg-white/30 rounded-xl backdrop-blur-[1px]",
				className,
			)}
			onClick={onClick}
		>
			<Lock size={16} className="text-gray-600 max-sm:w-[14px]" />
		</div>
	);
};
