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

export const formatCurrency = (num: number, currency: string) => {
	const formatter = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: currency.toUpperCase(),
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const formattedNum = formatter.format(num);
	if (currency !== "idr") return formattedNum[0] + " " + formattedNum.slice(1);
	else return formattedNum;
};

export const formatFractions = (
	num: number,
	min: number = 2,
	max: number = 4
) => {
	const formatter = new Intl.NumberFormat(navigator.language, {
		minimumFractionDigits: min,
		maximumFractionDigits: max,
	});
	return formatter.format(num);
};
