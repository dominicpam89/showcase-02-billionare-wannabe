import { QueryClient } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDeviceType(): "mobile" | "desktop" {
	const userAgent = navigator.userAgent;
	const mobileMatcher = new RegExp(/android|ios|windows phone/i);
	if (mobileMatcher.test(userAgent)) {
		return "mobile";
	} else return "desktop";
}
export type DeviceType = ReturnType<typeof getDeviceType>;

export const queryClient = new QueryClient();
export const authIconClass = "size-4";
