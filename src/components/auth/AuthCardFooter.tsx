import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { CardFooter } from "@/components/ui/card";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

interface Props {
	formTypeText: string;
	formType: AuthFormType;
	switchForm: (t: AuthFormType) => void;
}
export default function AuthCardFooter({
	formTypeText,
	formType,
	switchForm,
}: Props) {
	const { loginGoogle, loginState } = useContextGlobal();
	const disabled = loginState.isPending;
	return (
		<CardFooter className="flex flex-col gap-4">
			{formType != "reset-password" && (
				<Button
					className="w-full"
					variant="link"
					disabled={disabled}
					onClick={() => switchForm("reset-password")}
				>
					Forget password?
				</Button>
			)}
			{formType != "reset-password" && (
				<Button
					variant="outline"
					className="w-full"
					size="lg"
					onClick={() => loginGoogle()}
					disabled={disabled}
				>
					<span className="mr-4">
						<FcGoogle />
					</span>
					<span>
						{formTypeText + " "}
						with Google
					</span>
				</Button>
			)}
		</CardFooter>
	);
}
