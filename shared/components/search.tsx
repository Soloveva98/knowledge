"use client";

import React, { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { SearchIcon } from "lucide-react";

import { Question } from "../types/types";
import { Api } from "../services/api-client";
import { cn } from "../utils/utils";
import Link from "next/link";
import { appText } from "../constants/app-text";

export const Search: React.FC = ({}) => {
	const [query, setQuery] = useState<string>("");
	const [questions, setQuestions] = useState<Question[]>([]);
	const [focused, setFocused] = useState<boolean>(false);
	const searchBlockRef = useRef<HTMLDivElement | null>(null);
	const isFirstRender = useRef<boolean>(true);

	useClickAway(searchBlockRef, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			if (isFirstRender.current) {
				isFirstRender.current = false;

				return;
			}

			try {
				const response = await Api.question.search(query);
				setQuestions(response);
			} catch (err) {
				console.log(err);
			}
		},
		250,
		[query],
	);

	const onClickQuestion = () => {
		setQuery("");
		setFocused(false);
		setQuestions([]);
	};

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}
			<div
				ref={searchBlockRef}
				className="flex justify-end items-center relative z-30"
			>
				<div
					className={cn(
						"border rounded-2xl border-accent px-3 py-2 h-[38px] border-r-0 rounded-tr-none rounded-br-none bg-gray-50 flex justify-center items-center",
						focused && "border-none",
						"max-sm:px-2 max-sm:py-1 max-sm:h-[30px]",
					)}
				>
					<SearchIcon
						size={18}
						color="#00484d"
						className="max-sm:w-[14px]"
					/>
				</div>

				<input
					className={cn(
						"w-full h-[38px] outline-none rounded-2xl border-l-0 rounded-tl-none rounded-bl-none pl-0 bg-gray-50",
						focused && "border-none",
						"max-sm:py-1.5 max-sm:h-[30px] max-sm:placeholder:text-[12px]",
					)}
					type="text"
					placeholder={appText.findQuestion}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setFocused(true)}
				/>

				{questions.length > 0 && (
					<div
						className={cn(
							"absolute w-full rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 bg-white flex flex-col max-h-[260px] overflow-y-auto scrollbar",
							focused && "visible opacity-100 top-12",
							"max-sm:py-1 max-sm:top-10",
						)}
					>
						{questions.map(({ id, topicId, title }) => (
							<Link
								key={id}
								className="w-full px-3 py-2 hover:bg-accent/10 hover:text-accent max-sm:px-2 max-sm:py-1 max-sm:text-[12px]"
								href={`/topic/${topicId}/question/${id}`}
								onClick={onClickQuestion}
							>
								{title}
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
