import { useEffect, useState } from "react";
import { Topic } from "../types/types";

interface Props {
	get: () => Promise<Topic[]>;
}

export const useFetchOptions = ({ get }: Props): Topic[] => {
	const [options, setOptions] = useState<Topic[]>([]);

	useEffect(() => {
		const fetchTopics = async () => {
			try {
				const data = await get();

				if (data.length > 0) {
					setOptions(data);
				}
			} catch (error) {
				console.error("Error fetching topics:", error);
			}
		};

		fetchTopics();
	}, []);

	return options;
};
