export type FormUpdateProfileSchema = {
	name: {
		firstName: string;
		lastName: string;
	};
	email: string;
	password: {
		old: string;
		new: string;
		confirm: string;
	};
	photoURL: File;
};
