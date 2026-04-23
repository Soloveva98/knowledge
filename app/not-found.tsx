"use client";

import { appText } from "@/shared/constants/app-text";
import Link from "next/link";

const NotFoundPage = () => {
	const { pageNotFound, backHome } = appText;

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-8xl font-bold text-gray-300">404</div>

			<h1 className="text-3xl font-bold tracking-tight">
				{pageNotFound}
			</h1>

			<div className="pt-6">
				<Link className="btn" href="/">
					{backHome}
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
