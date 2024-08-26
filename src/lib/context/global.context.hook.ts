import {
	LimitedUserInfo,
	getLimitedUserInfo,
	googleAuthPopup,
	authLogin,
	authRegister,
	resendVerification,
	resetPassword,
} from "@/lib/services/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "../utils";

export const useGlobalContextState = () => {
	const { toast } = useToast();
	// root auth state and its trigger function
	const {
		data: currentUser,
		refetch: triggerAuth,
		...mainState
	} = useQuery({
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

	// state management of logout
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

	// state management of login with username and password
	const { mutate: loginWithEmail, ...loginWithEmailState } = useMutation({
		mutationFn: (data: { email: string; password: string }) => {
			toast({
				title: "Login processed",
				description: "Your request is being processed",
			});
			return authLogin(data);
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

	// state management of register with username and password
	const { mutate: registerWithEmail, ...registerWithEmailState } = useMutation(
		{
			mutationFn: (data: {
				email: string;
				password: string;
				firstName: string;
				lastName: string;
			}) => {
				toast({
					title: "Registration is processed",
					description: "Your request is being processed",
				});
				return authRegister(data);
			},
			onError(err) {
				toast({
					title: "Registration Error",
					description: err.message,
					variant: "destructive",
				});
			},
			onSuccess() {
				toast({
					title: "Auth Success",
					description: "Successfully registered!",
				});
			},
			onSettled() {
				queryClient.invalidateQueries({ queryKey: ["auth"] });
				triggerAuth();
			},
		}
	);

	// state management of register with username and password
	const { mutate: onResendVerification, ...resendVerificationState } =
		useMutation({
			mutationFn: () => {
				toast({
					title: "Sending verification",
					description: "Sending verification to your email...",
				});
				return resendVerification();
			},
			onError(err) {
				toast({
					title: "Failed to send verification",
					description: err.message,
					variant: "destructive",
				});
			},
			onSuccess() {
				toast({
					title: "Verification message has been sent",
					description: "Please check your inbox!",
				});
			},
			onSettled() {
				queryClient.invalidateQueries({ queryKey: ["auth"] });
				triggerAuth();
			},
		});

	const { mutate: onResetPassword, ...resetPasswordState } = useMutation({
		mutationFn: (data: { email: string }) => {
			toast({
				title: "Reset password request is submitted",
				description: "Sending reset password link to your email...",
			});
			return resetPassword(data);
		},
		onError(err) {
			toast({
				title: "Failed to send reset password link",
				description: err.message,
				variant: "destructive",
			});
		},
		onSuccess() {
			toast({
				title: "Reset password link has been sent",
				description: "Please check your inbox!",
			});
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			triggerAuth();
		},
	});

	return {
		mainState,
		currentUser,
		triggerAuth,
		registerWithEmail,
		loginWithEmail,
		loginGoogle,
		onResendVerification,
		onResetPassword,
		logout,
		loginState,
		logoutState,
		registerWithEmailState,
		loginWithEmailState,
		resendVerificationState,
		resetPasswordState,
	};
};
export type GlobalContextState = ReturnType<typeof useGlobalContextState>;
