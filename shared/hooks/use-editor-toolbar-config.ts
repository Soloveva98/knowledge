import { useMemo } from "react";
import { Editor } from "@tiptap/react";
import {
	Bold,
	Italic,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	AlignLeft,
	AlignCenter,
	AlignRight,
	List,
	ListOrdered,
	Link as LinkIcon,
	Highlighter,
	Image as ImageIcon,
	Table as TableIcon,
	Code2,
	Quote,
	Undo,
	Redo,
	Underline as UnderlineIcon,
	Minus,
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	Trash2,
} from "lucide-react";

import { useEditorMethods } from "./use-editor-methods";
import { ColorPicker } from "../components/editor/color-picker";

export const useEditorToolbarConfig = (editor: Editor) => {
	const { addLink, addImage } = useEditorMethods(editor as Editor);

	const headingsBtns = ([1, 2, 3, 4, 5] as const).map((level) => ({
		id: `heading${level}`,
		icon: [Heading1, Heading2, Heading3, Heading4, Heading5][level - 1],
		title: `Заголовок ${level}`,
		isActive: (editor: Editor) => editor.isActive("heading", { level }),
		onClick: (editor: Editor) =>
			editor.chain().focus().toggleHeading({ level }).run(),
	}));

	return useMemo(() => {
		const groups = [
			{
				id: "history",
				btns: [
					{
						id: "undo",
						icon: Undo,
						title: "Отменить",
						isActive: (editor: Editor) => editor.isActive("undo"),
						onClick: (editor: Editor) =>
							editor.chain().focus().undo().run(),
					},
					{
						id: "redo",
						icon: Redo,
						title: "Повторить",
						isActive: (editor: Editor) => editor.isActive("redo"),
						onClick: (editor: Editor) =>
							editor.chain().focus().redo().run(),
					},
				],
			},
			{
				id: "textFormat",
				hasDividerBefore: true,
				btns: [
					{
						id: "bold",
						icon: Bold,
						title: "Жирный",
						isActive: (editor: Editor) => editor.isActive("bold"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleBold().run(),
					},
					{
						id: "italic",
						icon: Italic,
						title: "Курсив",
						isActive: (editor: Editor) => editor.isActive("italic"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleItalic().run(),
					},
					{
						id: "underline",
						icon: UnderlineIcon,
						title: "Подчёркнутый",
						isActive: (editor: Editor) =>
							editor.isActive("underline"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleUnderline().run(),
					},
					{
						id: "colorPicker",
						component: ColorPicker,
						isCustom: true,
					},
					{
						id: "highlight",
						icon: Highlighter,
						title: "Выделить цветом",
						isActive: (editor: Editor) =>
							editor.isActive("highlight"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleHighlight().run(),
					},
				],
			},
			{
				id: "headings",
				hasDividerBefore: true,
				btns: headingsBtns,
			},
			{
				id: "lists",
				hasDividerBefore: true,
				btns: [
					{
						id: "bulletList",
						icon: List,
						title: "Маркированный список",
						isActive: (editor: Editor) =>
							editor.isActive("bulletList"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleBulletList().run(),
					},
					{
						id: "orderedList",
						icon: ListOrdered,
						title: "Нумерованный список",
						isActive: (editor: Editor) =>
							editor.isActive("orderedList"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleOrderedList().run(),
					},
				],
			},
			{
				id: "alignment",
				hasDividerBefore: true,
				btns: [
					{
						id: "alignLeft",
						icon: AlignLeft,
						title: "Выровнять по левому краю",
						isActive: (editor: Editor) =>
							editor.isActive({ textAlign: "left" }),
						onClick: (editor: Editor) =>
							editor.chain().focus().setTextAlign("left").run(),
					},
					{
						id: "alignCenter",
						icon: AlignCenter,
						title: "По центру",
						isActive: (editor: Editor) =>
							editor.isActive({ textAlign: "center" }),
						onClick: (editor: Editor) =>
							editor.chain().focus().setTextAlign("center").run(),
					},
					{
						id: "alignRight",
						icon: AlignRight,
						title: "По правому краю",
						isActive: (editor: Editor) =>
							editor.isActive({ textAlign: "right" }),
						onClick: (editor: Editor) =>
							editor.chain().focus().setTextAlign("right").run(),
					},
				],
			},
			{
				id: "blocks",
				hasDividerBefore: true,
				btns: [
					{
						id: "blockquote",
						icon: Quote,
						title: "Цитата",
						isActive: (editor: Editor) =>
							editor.isActive("blockquote"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleBlockquote().run(),
					},
					{
						id: "codeBlock",
						icon: Code2,
						title: "Блок кода",
						isActive: (editor: Editor) =>
							editor.isActive("codeBlock"),
						onClick: (editor: Editor) =>
							editor.chain().focus().toggleCodeBlock().run(),
					},
				],
			},
			{
				id: "media",
				hasDividerBefore: true,
				btns: [
					{
						id: "link",
						icon: LinkIcon,
						title: "Вставить ссылку",
						onClick: addLink,
					},
					{
						id: "image",
						icon: ImageIcon,
						title: "Вставить изображение",
						onClick: addImage,
					},
				],
			},
			{
				id: "table",
				hasDividerBefore: true,
				btns: [
					{
						id: "insertTable",
						icon: TableIcon,
						title: "Вставить таблицу",
						onClick: (editor: Editor) =>
							editor
								.chain()
								.focus()
								.insertTable({
									rows: 3,
									cols: 3,
									withHeaderRow: true,
								})
								.run(),
					},
					{
						id: "addRowBefore",
						icon: ArrowUp,
						title: "Добавить строку выше",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().addRowBefore().run(),
					},
					{
						id: "addRowAfter",
						icon: ArrowDown,
						title: "Добавить строку ниже",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().addRowAfter().run(),
					},
					{
						id: "deleteRow",
						icon: Minus,
						title: "Удалить строку",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().deleteRow().run(),
					},
					{
						id: "addColumnBefore",
						icon: ArrowLeft,
						title: "Добавить колонку слева",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().addColumnBefore().run(),
					},
					{
						id: "addColumnAfter",
						icon: ArrowRight,
						title: "Добавить колонку справа",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().addColumnAfter().run(),
					},
					{
						id: "deleteColumn",
						icon: Minus,
						title: "Удалить колонку",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().deleteColumn().run(),
					},
					{
						id: "deleteTable",
						icon: Trash2,
						title: "Удалить таблицу",
						isVisible: (editor: Editor) => editor.isActive("table"),
						onClick: (editor: Editor) =>
							editor.chain().focus().deleteTable().run(),
					},
				],
			},
		];

		return groups;
	}, [editor, addLink, addImage]);
};
