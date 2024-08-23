import {
	LimitedUserInfo,
	getLimitedUserInfo,
	googleAuthPopup,
	googleAuthRedirect,
	googleAuthRedirectNext,
} from "@/lib/services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { getDeviceType } from "../utils";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGlobalContextState = () => {
	const { data: currentUser, refetch: triggerAuth } = useQuery({
		queryKey: ["auth"],
		queryFn: () =>
			new Promise<LimitedUserInfo | null>((resolve) => {
				onAuthStateChanged(auth, (user) => {
					if (user) resolve(getLimitedUserInfo(user));
					else resolve(null);
				});
			}),
	});

	const deviceType = getDeviceType();
	const {
		mutate: loginGoogle,
		isPending,
		error,
		isError,
	} = useMutation({
		mutationFn:
			deviceType == "desktop" ? googleAuthPopup : googleAuthRedirectNext,
	});

	return {
		currentUser,
		triggerAuth,
		loginGoogle,
		isPending,
		error,
		isError,
		googleAuthRedirect,
	};
};
export type GlobalContextState = ReturnType<typeof useGlobalContextState>;
