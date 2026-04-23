"use server";

import React from "react";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function verifyAdminPassword(formData: FormData) {
	try {
		const password = formData.get("password") as string;

		if (!password) {
			throw new Error("Пожалуйста, введите пароль.");
		}

		const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
		const pepper = process.env.ADMIN_PASSWORD_PEPPER;

		if (!hashedPassword || !pepper) {
			throw new Error("Ошибка конфигурации сервера");
		}

		const passwordWithPepper = password + pepper;
		const isValid = await bcrypt.compare(
			passwordWithPepper,
			hashedPassword,
		);

		if (!isValid) {
			throw new Error("Неверный пароль");
		}

		const cookieStore = await cookies();
		cookieStore.set("admin-token", "authenticated", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 30,
			path: "/",
		});

		return { success: true };
	} catch (error) {
		console.log("[VERIFY_ADMIN_PASSWORD] Server error", error);

		return { success: false, error };
	}
}

export async function logoutAdmin() {
	const cookieStore = await cookies();
	cookieStore.delete("admin-token");
	revalidatePath("/");

	return { success: true };
}

export async function checkAdminStatus() {
	const cookieStore = await cookies();
	const token = cookieStore.get("admin-token");

	return { isAdmin: token?.value === "authenticated" };
}
