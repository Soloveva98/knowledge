import { Topic } from "../types/types";
import { request } from "@/shared/services/api-client";

export const getAll = () => request<Topic[]>("/api/topics");

export const get = (topicId: number) =>
	request<Topic>(`/api/topics/${topicId}`);

export const add = (name: string) =>
	request<Topic>("/api/topics", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ name }),
	});

export const update = (topicId: number, fields: Partial<Topic>) =>
	request<Topic>(`/api/topics/${topicId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(fields),
	});

export const deleteTopic = (topicId: number) =>
	request(`/api/topics/${topicId}`, {
		method: "DELETE",
		credentials: "include",
	});
