"use client";

import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "react-use";

import { PRESET_COLORS } from "@/shared/constants/editor-colors";
import { appText } from "@/shared/constants/app-text";

interface Props {
	editor: any;
}

export const ColorPicker: React.FC<Props> = ({ editor }) => {
	const [showPicker, setShowPicker] = useState(false);
	const [currentColor, setCurrentColor] = useState(
		editor.getAttributes("textStyle").color || "#000000",
	);
	const pickerRef = useRef<HTMLDivElement>(null);
	const { textColor, resetColor } = appText;

	useClickAway(pickerRef, () => setShowPicker(false));

	const setColor = (color: string) => {
		setCurrentColor(color);
		editor.chain().focus().setColor(color).run();
	};

	const unsetColor = () => {
		setCurrentColor("#000000");
		editor.chain().focus().unsetColor().run();
	};

	return (
		<div className="relative" ref={pickerRef}>
			<button
				type="button"
				onClick={() => setShowPicker(!showPicker)}
				className="p-1 rounded-md bg-white hover:bg-gray-200 flex items-center gap-1"
				title={textColor}
			>
				<div
					className="w-4 h-4 rounded-md border border-accent"
					style={{ backgroundColor: currentColor }}
				/>
			</button>

			{showPicker && (
				<div className="absolute top-full mt-1 z-50 bg-white p-1 rounded-lg shadow-lg border border-accent">
					<HexColorPicker color={currentColor} onChange={setColor} />

					<div className="flex gap-1 mt-2 flex-wrap">
						{PRESET_COLORS.map((color) => (
							<button
								key={color}
								type="button"
								onClick={() => setColor(color)}
								className="w-4.5 h-4.5 p-0 rounded-md border border-accent"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>

					<button
						type="button"
						onClick={unsetColor}
						className="mt-2 text-xs w-full text-center py-1 rounded-lg"
					>
						{resetColor}
					</button>
				</div>
			)}
		</div>
	);
};
