"use client";

import React from "react";

import { ActionBtns, BackButton } from ".";

interface Props {
	backText: string;
	topicSuccess: boolean;
	onSuccessClick: () => void;
	onEditClick: () => void;
	onTrashClick: () => void;
	onBlockClick?: () => void;
	isBlocked?: boolean;
	isLoadingAccess?: boolean;
}

export const TopBar: React.FC<Props> = ({
	backText,
	topicSuccess,
	onSuccessClick,
	onEditClick,
	onTrashClick,
	onBlockClick = () => {},
	isBlocked = false,
	isLoadingAccess = false,
}) => {
	return (
		<div className="flex justify-between items-center gap-3 max-xs:flex-col">
			<BackButton text={backText} />

			<ActionBtns
				isSuccess={topicSuccess}
				isBlocked={isBlocked}
				isLoadingAccess={isLoadingAccess}
				onSuccessClick={onSuccessClick}
				onEditClick={onEditClick}
				onTrashClick={onTrashClick}
				onBlockClick={onBlockClick}
			/>
		</div>
	);
};
