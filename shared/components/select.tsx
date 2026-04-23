"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useClickAway } from "react-use";

import { Topic } from "../types/types";
import { cn } from "@/shared/utils/utils";
import { useFetchOptions } from "../hooks";
import { appText } from "../constants/app-text";

interface Props {
	value: number | null;
	getOptions: () => Promise<Topic[]>;
	onChange: (topicId: number) => void;
	disabled?: boolean;
	placeholder?: string;
}

export const Select: React.FC<Props> = ({
	value,
	disabled = false,
	placeholder = appText.selectTopic,
	getOptions,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<Topic | null>(null);
	const options = useFetchOptions({ get: getOptions });
	const selectRef = useRef<HTMLDivElement>(null);

	useClickAway(selectRef, () => setIsOpen(false));

	useEffect(() => {
		if (value && options.length > 0) {
			const topic = options.find(({ id }) => id === value);
			setSelectedOption(topic || null);
		} else if (!value) {
			setSelectedOption(null);
		}
	}, [value, options]);

	const handleSelect = (topic: Topic) => {
		setSelectedOption(topic);
		onChange?.(topic.id);
		setIsOpen(false);
	};

	return (
		<div ref={selectRef} className="w-full relative">
			<button
				className="btn-transparent w-full px-3 py-2 text-left border border-accent rounded-xl flex justify-between items-center transform-none disabled:opacity-50 max-sm:text-xs max-sm:"
				type="button"
				disabled={disabled}
				onClick={() => !disabled && setIsOpen(!isOpen)}
			>
				<span
					className={
						selectedOption ? "text-primary" : "text-[#00000080]"
					}
				>
					{selectedOption ? selectedOption.name : placeholder}
				</span>

				{!disabled && (
					<ChevronDown
						size={20}
						className={cn(
							"transition-transform",
							isOpen ? "rotate-180" : "",
							"max-sm:w-[15px]"
						)}
					/>
				)}
			</button>

			{isOpen && !disabled && (
				<ul className="absolute z-10 bg-white w-full mt-1 border border-accent rounded-xl shadow-lg max-h-60 overflow-auto max-sm:py-1">
					{options.map((topic) => (
						<li
							key={topic.id}
							onClick={() => handleSelect(topic)}
							className={cn(
								"px-4 py-2 cursor-pointer hover:bg-bg-primary transition-colors",
								selectedOption?.id === topic.id
									? "bg-bg-primary text-accent"
									: "",
								"max-sm:text-xs max-sm:px-3 max-sm:py-1.5",
							)}
						>
							{topic.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
