import React from "react";
import { Editor } from "@tiptap/react";

import { ToolbarGroup as ToolbarGroupType } from "@/shared/types/types";
import { ToolbarButton } from "./toolbar-button";
import { Divider } from "../divider";

interface Props {
	group: ToolbarGroupType;
	editor: Editor;
}

export const ToolbarGroup: React.FC<Props> = ({ group, editor }) => {
	return (
		<>
			{group.hasDividerBefore && <Divider />}

			{group.btns.map((btn) => {
				if (btn.isVisible && !btn.isVisible(editor)) return null;

				if (btn.isCustom && btn.component) {
					const CustomBtn = btn.component;

					return <CustomBtn key={btn.id} editor={editor} />;
				}

				return (
					<ToolbarButton
						key={btn.id}
						isActive={btn.isActive?.(editor)}
						title={btn.title}
						onClick={() => btn.onClick?.(editor)}
					>
						{btn.icon && <btn.icon size={16} />}
					</ToolbarButton>
				);
			})}
		</>
	);
};
