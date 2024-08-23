import {
	getRedirectResult,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	UserCredential,
	User,
} from "firebase/auth";
import { auth } from "@/lib/firebase.config";

// let GoogleAuthProvider to handle authentication
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export async function googleAuthRedirect() {
	signInWithRedirect(auth, provider);
}
export type AuthRedirect = ReturnType<typeof googleAuthRedirect>;

export async function googleAuthRedirectNext() {
	try {
		const result = await getRedirectResult(auth);
		if (!result) throw new Error("You didn't signed in properly");
		return getGoogleAuthResult(result);
	} catch (error) {
		console.error(error);
		throw error as Error;
	}
}
export type AuthRedirectNext = ReturnType<typeof googleAuthRedirectNext>;

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
