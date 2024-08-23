import { useEffect, useState } from "react";
import {
	LimitedUserInfo,
	googleAuthPopup,
	googleAuthRedirect,
	googleAuthRedirectNext,
} from "@/lib/services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { getDeviceType } from "../utils";

export const useGlobalContextState = () => {
	const [currentUser, setCurrentUser] = useState<LimitedUserInfo | null>(null);
	const [authLoading, setIsAuthLoading] = useState(false);
	const [authError, setAuthError] = useState<Error | null>(null);
	const [isAuthError, setIsAuthError] = useState(false);
	const [triggerAuth, setTriggerAuth] = useState(false);

	const handleErrors = (error: Error) => {
		setIsAuthError(true);
		setAuthError(error);
	};

	const clearErrors = () => {
		setIsAuthError(false);
		setAuthError(null);
	};

	const toggleLoading = (state: boolean) => {
		setIsAuthLoading(state);
	};

	const onTriggerAuth = () => setTriggerAuth(!triggerAuth);

	const loginWithGoogle = () =>
		handleLoginWithGoogle({
			handleErrors,
			setCurrentUser,
			toggleLoading,
		});

	// check user and set it to currentUser whenever triggered
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		});
	}, [auth, triggerAuth]);

	return {
		loginWithGoogle,
		currentUser,
		authLoading,
		authError,
		isAuthError,
		clearErrors,
		handleErrors,
		toggleLoading,
		onTriggerAuth,
	};
};
export type UseGlobalContextStateType = ReturnType<
	typeof useGlobalContextState
>;

// function related to hooks
interface HandleLoginWithGoogleParams {
	toggleLoading: (s: boolean) => void;
	setCurrentUser: React.Dispatch<LimitedUserInfo | null>;
	handleErrors: (err: Error) => void;
}
async function handleLoginWithGoogle({
	handleErrors,
	setCurrentUser,
	toggleLoading,
}: HandleLoginWithGoogleParams) {
	toggleLoading(true);
	const deviceType = getDeviceType();
	try {
		if (deviceType == "desktop") {
			const user = await googleAuthPopup();
			setCurrentUser(user.userInfo);
		} else {
			googleAuthRedirect();
			const user = await googleAuthRedirectNext();
			setCurrentUser(user.userInfo);
		}
	} catch (error) {
		handleErrors(error as Error);
	} finally {
		toggleLoading(false);
	}
}
