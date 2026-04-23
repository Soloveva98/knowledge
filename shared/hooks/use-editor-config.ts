import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlock from "@tiptap/extension-code-block";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ImageResize from "tiptap-extension-resize-image";

interface Props {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}

export const useEditorConfig = ({
	value,
	placeholder,
	onChange,
}: Props): Editor | null => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3, 4, 5] },
				codeBlock: false,
				link: false,
			}),
			TextStyle,
			Color.configure({
				types: ["textStyle"],
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: { target: "_blank" },
			}),
			Highlight.configure({
				multicolor: true,
			}),
			Image.configure({
				inline: false,
				allowBase64: true,
				HTMLAttributes: { class: "rounded-lg max-w-full" },
			}),
			ImageResize,
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			CodeBlock.configure({
				HTMLAttributes: {
					class: "rounded-md bg-gray-900 text-gray-100 p-3 overflow-x-auto",
				},
			}),
			Placeholder.configure({ placeholder }),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "min-h-[200px] w-full text-[14px] rounded-b-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#d6c291] prose max-w-none",
			},
		},
		immediatelyRender: false,
	});

	return editor;
};
