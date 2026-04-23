import { Editor } from "@tiptap/react";

export type Question = {
	id: number;
	title: string;
	text: string;
	topicId: number;
	success: boolean;
};

export type QuestionApi = {
	title: string;
	text: string;
	topicId: number;
};

export type TopicStats = {
	totalQuestions: number;
	completedQuestions: number;
};

export type Topic = {
	id: number;
	name: string;
	success: boolean;
	questions: Question[];
	stats: TopicStats;
};

export type UrlModalType = "link" | "image" | null;

export type ToolbarItem = {
	id: string;
	isCustom?: boolean;
	component?: React.ComponentType<any>;
	icon?: React.ComponentType<any>;
	title?: string;
	isActive?: (editor: Editor) => boolean;
	isVisible?: (editor: Editor) => boolean;
	onClick?: (editor: Editor, tableFn?: any) => void;
	props?: Record<string, any>;
};

export type ToolbarGroup = {
	id: string;
	btns: ToolbarItem[];
	hasDividerBefore?: boolean;
};
