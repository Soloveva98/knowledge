"use client";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { AddButton, Search, SkeletonCard } from ".";
import { useModalStore } from "../store";
import { useAdminAuth } from "../hooks";
import { appText } from "../constants/app-text";

export const Header: React.FC = () => {
	const { openTopicModal, openQuestionModal } = useModalStore();
	const { isAdmin, isLoading, requestAccess, logout } = useAdminAuth();
	const { knowledgeBase, addTopic, addQuestion } = appText;

	const handleAddTopic = () => {
		requestAccess(openTopicModal);
	};

	const handleAddQuestion = () => {
		requestAccess(openQuestionModal);
	};

	return (
		<header className="w-full sticky top-0 bg-white z-30 shadow max-xs:static">
			<div className="max-w-[1440px] w-full mx-auto flex flex-col gap-5 px-5 pt-3 pb-4 max-sm:gap-3 max-sm:px-3 max-sm:pt-2 max-sm:pb-3">
				<div className="w-full flex items-center justify-between gap-5 max-xs:flex-col max-xs:gap-2">
					<Link
						href="/"
						className="cursor-pointer flex items-center gap-3 max-sm:gap-2"
					>
						<div className="w-[45px] min-w-[45px] h-[45px] rounded-full bg-accent flex justify-center items-center max-sm:w-[35px] max-sm:min-w-[35px] max-sm:h-[35px] max-xs:hidden">
							<img
								src="/logo.svg"
								width={22}
								alt="logo"
								className="max-sm:w-[16px]"
							/>
						</div>
						<span className="font-medium text-accent text-[16px] max-sm:text-[12px] max-xs:text-[14px]">
							{knowledgeBase}
						</span>
					</Link>

					<div className="flex gap-2.5 max-sm:gap-1.5 max-xs:flex-wrap justify-center">
						{isLoading ? (
							<>
								<SkeletonCard className="h-[38px] w-[186px]" />
								<SkeletonCard className="h-[38px] w-[186px]" />
							</>
						) : (
							<>
								<AddButton
									onClick={handleAddTopic}
									text={addTopic}
									isBlocked={!isAdmin}
								/>

								<AddButton
									onClick={handleAddQuestion}
									text={addQuestion}
									isBlocked={!isAdmin}
								/>

								{isAdmin && (
									<button
										onClick={logout}
										className="max-sm:px-3 max-sm:py-2"
									>
										<LogOut
											size={18}
											className="max-sm:w-[14px]"
										/>
									</button>
								)}
							</>
						)}
					</div>
				</div>

				<Search />
			</div>
		</header>
	);
};
