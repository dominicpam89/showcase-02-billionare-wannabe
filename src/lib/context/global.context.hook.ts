import {
	LimitedUserInfo,
	getLimitedUserInfo,
	googleAuthPopup,
} from "@/lib/services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
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

	const {
		mutate: loginGoogle,
		isPending: authPending,
		error: authError,
		isError: isAuthError,
	} = useMutation({
		mutationFn: googleAuthPopup,
	});

	return {
		currentUser,
		triggerAuth,
		loginGoogle,
		authPending,
		authError,
		isAuthError,
	};
};
export type GlobalContextState = ReturnType<typeof useGlobalContextState>;
