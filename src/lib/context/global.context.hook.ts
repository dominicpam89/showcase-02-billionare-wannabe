import {
	LimitedUserInfo,
	getLimitedUserInfo,
	googleAuthPopup,
} from "@/lib/services/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "../utils";

export const useGlobalContextState = () => {
	// get triggerAuth to get recent state of auth from firebase
	const { toast } = useToast();
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

	// state management of login with Google Provider
	const { mutate: loginGoogle, ...loginState } = useMutation({
		mutationFn: () => {
			toast({
				title: "Login processed",
				description: "Your request is being processed",
			});
			return googleAuthPopup();
		},
		onError(err) {
			toast({
				title: "Auth Error",
				description: err.message,
				variant: "destructive",
			});
		},
		onSuccess() {
			toast({
				title: "Auth Success",
				description: "Successfully logged in",
			});
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			triggerAuth();
		},
	});

	// state management of logout with Google Provider
	const { mutate: logout, ...logoutState } = useMutation({
		mutationFn: () => {
			toast({
				title: "Logging out...",
				description: "Your logout request is being processed",
			});
			return signOut(auth);
		},
		onError(err) {
			toast({
				title: "Logout Failed",
				description: err.message,
				variant: "destructive",
			});
		},
		onSuccess() {
			toast({
				title: "Logout Success",
				description: "Successfully logged out",
			});
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			triggerAuth();
		},
	});

	return {
		currentUser,
		triggerAuth,
		loginGoogle,
		logout,
		loginState,
		logoutState,
	};
};
export type GlobalContextState = ReturnType<typeof useGlobalContextState>;
