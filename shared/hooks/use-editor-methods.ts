import { useCallback } from "react";
import { Editor } from "@tiptap/react";

import { useModalStore } from "../store";

export const useEditorMethods = (editor: Editor) => {
	const { openUrlModal } = useModalStore();

	const addLink = useCallback(() => {
		if (!editor) return;

		const currentLink = editor.getAttributes("link").href || "";

		openUrlModal((url: string) => {
			const { from, to } = editor.state.selection;
			const hasSelection = from !== to;

			if (hasSelection) {
				editor.chain().focus().setLink({ href: url }).run();
			} else {
				const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
				editor.chain().focus().insertContent(linkHtml).run();
			}
		}, currentLink);
	}, [editor, openUrlModal]);

	const addImage = useCallback(() => {
		if (!editor) return;

		openUrlModal((url: string) => {
			editor.chain().focus().setImage({ src: url }).run();
		});
	}, [editor, openUrlModal]);

	// const tableFn = useCallback(
	// 	(
	// 		method: string,
	// 		options?: Record<string, number | string | boolean>,
	// 	) => {
	// 		if (!editor) return;

	// 		const chain = editor.chain().focus();
	// 		(chain as any)[method](options ?? {});
	// 		chain.run();
	// 	},
	// 	[editor],
	// );

	return {
		addLink,
		addImage,
	};
};
