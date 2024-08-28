import {
	LimitedUserInfo,
	getLimitedUserInfo,
	googleAuthPopup,
	authLogin,
	authRegister,
	resendVerification,
	resetPassword,
	onUpdatePassword,
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

	const createMutationOptions = (successMessage: string) => ({
		onError: (err: any) => {
			toast({
				title: "Operation Failed",
				description: err.message,
				variant: "destructive",
			});
		},
		onSuccess: () => {
			toast({
				title: "Operation Successful",
				description: successMessage,
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			triggerAuth();
		},
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
		...createMutationOptions("Successfully login with google"),
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
		...createMutationOptions("Successfully logged out!"),
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
		...createMutationOptions("Successfully logged in with email!"),
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
			...createMutationOptions("Successfully registered with email"),
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
			...createMutationOptions("Your account has been verified!"),
		});

	// state management of reset password
	const { mutate: onResetPassword, ...resetPasswordState } = useMutation({
		mutationFn: (data: { email: string }) => {
			toast({
				title: "Reset password request is submitted",
				description: "Sending reset password link to your email...",
			});
			return resetPassword(data);
		},
		...createMutationOptions("Your password has been reset!"),
	});

	// state management of update password
	const { mutate: updatePassword, ...updatePasswordState } = useMutation({
		mutationFn: (data: { newPass: string }) => {
			toast({
				title: "Updating your password",
				description: "Please wait while we are processing your request",
			});
			return onUpdatePassword(data);
		},
		...createMutationOptions("Your password has been updated!"),
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
		updatePassword,
		logout,
		loginState,
		logoutState,
		registerWithEmailState,
		loginWithEmailState,
		resendVerificationState,
		resetPasswordState,
		updatePasswordState,
	};
};
export type GlobalContextState = ReturnType<typeof useGlobalContextState>;
