import { FormUpdateProfileSchema } from "@/lib/definition/profile";
import { RegisterOptions } from "react-hook-form";

type Rules = RegisterOptions<
	FormUpdateProfileSchema,
	| "name"
	| "email"
	| "password"
	| "photo"
	| "password.old"
	| "password.new"
	| "password.confirm"
>;

export const nameRules: Rules = {
	min: { value: 3, message: "Nobody's name is less than 3 alphabet!" },
	max: { value: 40, message: "Why so long? Maximum 40 characters!" },
	required: {
		value: true,
		message: "Nameless are not allowed to be billionare!",
	},
};

export const emailRules: Rules = {
	pattern: {
		value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i,
		message:
			"This is invalid email! Police! Help me! Somebody is fooling around!",
	},
};

export const passRules: Rules = {
	required: {
		value: true,
		message: "You must have funny password otherwise you won't get here!",
	},
};

export const newPassRules: Rules = {
	pattern: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/,
		message:
			"Password must be 8-64 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character",
	},
};
