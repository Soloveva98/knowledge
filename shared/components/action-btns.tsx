"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Badge, BlockOverlay, SkeletonCard, ToggleButton } from ".";
import { cn } from "../utils/utils";
import { appText } from "../constants/app-text";

interface Props {
	isSuccess: boolean;
	isBlocked: boolean;
	isLoadingAccess: boolean;
	onSuccessClick: () => void;
	onEditClick: () => void;
	onTrashClick: () => void;
	onBlockClick: () => void;
}

export const ActionBtns: React.FC<Props> = ({
	isSuccess,
	isBlocked,
	isLoadingAccess,
	onSuccessClick,
	onEditClick,
	onTrashClick,
	onBlockClick,
}) => {
	const {
		passed,
		notPassed,
		markAsCompleted,
		markAsNotCompleted,
		edit,
		delete: deleteText,
	} = appText;

	return (
		<div className="flex gap-4 items-center max-sm:gap-2">
			<Badge
				text={isSuccess ? passed : notPassed}
				className={cn(
					"text-[11px] text-white px-2 h-6 m-0",
					isSuccess ? "bg-success" : "bg-unsuccess",
					"max-sm:text-[10px] max-sm:px-2 max-sm:py-0.5 max-sm:h-5",
				)}
			/>

			{isLoadingAccess ? (
				<div className="relative flex items-center gap-4 max-sm:gap-2">
					<SkeletonCard className="w-[24px] h-[24px] rounded-md max-sm:w-[20px] max-sm:h-[20px]" />
					<SkeletonCard className="w-[24px] h-[24px] rounded-md max-sm:w-[20px] max-sm:h-[20px]" />
					<SkeletonCard className="w-[24px] h-[24px] rounded-md max-sm:w-[20px] max-sm:h-[20px]" />
				</div>
			) : (
				<div className="relative flex items-center gap-4 max-sm:gap-2">
					<div
						className={cn(
							"flex items-center gap-4",
							isBlocked && "opacity-40",
						)}
					>
						<ToggleButton
							success={isSuccess}
							onClick={onSuccessClick}
							successText={markAsCompleted}
							unsuccessText={markAsNotCompleted}
						/>

						<button
							onClick={onEditClick}
							className="flex items-center justify-center btn-transparent p-2 max-sm:p-0"
							title={edit}
							disabled={isBlocked}
						>
							<Pencil
								color="#00484d"
								size={20}
								className="max-sm:w-[15px]"
							/>
						</button>

						<button
							onClick={onTrashClick}
							className="flex items-center justify-center btn-transparent p-2 max-sm:p-0"
							title={deleteText}
							disabled={isBlocked}
						>
							<Trash2
								color="#00484d"
								size={20}
								className="max-sm:w-[16px]"
							/>
						</button>
					</div>

					{isBlocked && <BlockOverlay onClick={onBlockClick} />}
				</div>
			)}
		</div>
	);
};
