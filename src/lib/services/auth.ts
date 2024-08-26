import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	UserCredential,
	User,
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

export async function authRegister({ email, password }: AuthParams) {
	try {
		const result = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return getGoogleAuthResult(result);
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
