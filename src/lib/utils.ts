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

export const formatCurrency = (
	num: number,
	currency: string,
	min: number = 2,
	max: number = 6
) => {
	const formatter = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: currency.toUpperCase(),
		minimumFractionDigits: min,
		maximumFractionDigits: max,
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

export const formatDate = (
	unix: number,
	withYear: boolean = false,
	withMonth: boolean = true
) => {
	const date = new Date(unix);
	let options: Intl.DateTimeFormatOptions = {};

	if (!withYear && !withMonth) {
		// Retrieve only the day of the week
		options = { weekday: "long", day: "numeric" };
	} else if (withMonth && !withYear) {
		// Retrieve date and month
		options = { month: "long", day: "numeric" };
	} else if (withYear && withMonth) {
		// Retrieve month and year only
		options = { month: "long", year: "numeric" };
	}

	const formatter = new Intl.DateTimeFormat(navigator.language, options);
	const dateFormatted = formatter.format(date);

	return dateFormatted;
};
