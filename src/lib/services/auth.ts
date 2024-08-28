import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	updateProfile,
	UserCredential,
	User,
	updatePassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase.config";

// let GoogleAuthProvider to handle authentication
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export async function googleAuthPopup() {
	try {
		const result = await signInWithPopup(auth, provider);
		return getGoogleAuthResult(result);
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}
export type AuthPopup = ReturnType<typeof googleAuthPopup>;

interface AuthParams {
	email: string;
	password: string;
}
export async function authLogin({ email, password }: AuthParams) {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		return getGoogleAuthResult(result);
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}

interface AuthParamsRegister extends AuthParams {
	firstName: string;
	lastName: string;
}
export async function authRegister({
	email,
	password,
	firstName,
	lastName,
}: AuthParamsRegister) {
	try {
		const result = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await updateProfile(result.user, {
			displayName: firstName.concat(" ").concat(lastName),
		});
		await sendEmailVerification(result.user);
		return getGoogleAuthResult(result);
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}

export async function resendVerification() {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error("You're not logged in!");
		await sendEmailVerification(user);
		return { status: true, message: "Verification sent" };
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}

export async function resetPassword({ email }: { email: string }) {
	try {
		await sendPasswordResetEmail(auth, email);
		return { status: true, message: "Reset password link sent" };
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}

export async function onUpdatePassword({ newPass }: { newPass: string }) {
	try {
		const currentUser = auth.currentUser;
		if (!currentUser) throw new Error("No user currently signed in!");
		await updatePassword(currentUser, newPass);
		return { status: true, message: "Your password has been updated" };
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}

function getGoogleAuthResult(result: UserCredential) {
	const credential = GoogleAuthProvider.credentialFromResult(result);
	const token = credential?.accessToken;
	return {
		token,
		userInfo: getLimitedUserInfo(result.user),
	};
}
export type AuthResult = ReturnType<typeof getGoogleAuthResult>;

export function getLimitedUserInfo(user: User) {
	const { email, emailVerified, displayName, uid, photoURL } = user;
	return { email, emailVerified, displayName, uid, photoURL };
}
export type LimitedUserInfo = ReturnType<typeof getLimitedUserInfo>;
