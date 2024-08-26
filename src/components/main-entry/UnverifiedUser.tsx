import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function UnverifiedUser() {
	const { onResendVerification, resendVerificationState } = useContextGlobal();
	const disabled = resendVerificationState.isPending;
	return (
		<Card
			aria-label="unverified-user-container"
			className="w-full max-w-md mx-auto"
		>
			<CardHeader>
				<CardTitle>Account Unverified</CardTitle>
				<CardDescription>
					You need to verify your account before continue using this app!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Check your inbox to get verification done!</p>
			</CardContent>
			<CardFooter className="justify-end">
				<Button
					className="w-full"
					variant="link"
					onClick={() => onResendVerification()}
					disabled={disabled}
				>
					Resend verification to email
				</Button>
			</CardFooter>
		</Card>
	);
}
