"use client";

import React from "react";

export const Loader: React.FC = () => {
	return (
		<div className="relative w-12 h-12 mx-auto before:content-[''] before:absolute before:w-12 before:h-[5px] before:bg-black/25 before:top-[60px] before:left-0 before:rounded-full before:animate-shadow-custom after:content-[''] after:absolute after:w-full after:h-full after:bg-accent after:top-0 after:left-0 after:rounded-[4px] after:animate-spin-custom max-sm:w-10 max-sm:h-10 max-sm:before:w-10 max-sm:before:h-[3px]"></div>
	);
};
