export type FormUpdateProfileSchema = {
	name: string;
	email: string;
	password: {
		old: string;
		new: string;
		confirm: string;
	};
	photo: File;
};
