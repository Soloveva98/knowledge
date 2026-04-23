import { Question, QuestionApi } from "../types/types";
import { request } from "./api-client";

export const get = (questionId: number) =>
	request<Question>(`/api/questions/${questionId}`);

export const search = (query: string) =>
	request<Question[]>(
		`/api/questions/search?query=${encodeURIComponent(query)}`,
	);

export const add = (question: QuestionApi) =>
	request<Question>("/api/questions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(question),
	});

export const update = (questionId: number, fields: Partial<Question>) =>
	request<Question>(`/api/questions/${questionId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ fields }),
	});

export const deleteQuestion = (topicId: number, questionId: number) =>
	request<Question>(`/api/questions/${questionId}`, {
		method: "DELETE",
		credentials: "include",
		body: JSON.stringify({ topicId }),
	});
