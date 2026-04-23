"use client";

import React, { useEffect } from "react";
import { Editor, EditorContent } from "@tiptap/react";

import { ToolbarGroup } from "./toolbar-group";
import { useEditorConfig, useEditorToolbarConfig } from "@/shared/hooks";

interface Props {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}

export const EditorTextarea: React.FC<Props> = ({
	value,
	onChange,
	placeholder = "Введите текст...",
}) => {
	const editor = useEditorConfig({ value, placeholder, onChange });
	const groups = useEditorToolbarConfig(editor as Editor);

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [editor, value]);

	if (!editor) return null;

	return (
		<div className="border border-accent rounded-xl overflow-hidden">
			<div className="flex flex-wrap gap-2 p-2 border-b border-accent bg-accent">
				{groups.map((group) => (
					<ToolbarGroup
						key={`group-btn-${group.id}`}
						group={group}
						editor={editor}
					/>
				))}
			</div>

			<EditorContent editor={editor} className="resize-y" />
		</div>
	);
};
