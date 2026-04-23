import React from "react";
import { Topic } from "@/shared/components";

interface Props {
	params: Promise<{ topicId: string }>;
}

export default async function TopicPage({ params }: Props) {
	const { topicId } = await params;

	return <Topic topicId={Number(topicId)} />;
}
