import { useCallback, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import AuthCardHeader from "./AuthCardHeader";
import AuthCardContent from "./AuthCardContent";
import AuthCardFooter from "./AuthCardFooter";

export default function Auth() {
	const [formType, setFormType] = useState<AuthFormType>("login");
	const switchForm = useCallback((t: AuthFormType) => {
		if (t == "login") setFormType("login");
		else if (t == "register") setFormType("register");
		else setFormType("reset-password");
	}, []);

	const formTypeText = useMemo(
		() => formType.slice(0, 1).toUpperCase().concat(formType.slice(1)),
		[formType]
	);
	const text =
		formType == "login"
			? "You don't have bilionare account? Silly! "
			: formType == "register"
			? "You already trying so hard to become billionare and "
			: "Billionare never forget their password. What are you?";

	const textLink =
		formType == "login"
			? "Create account!"
			: formType == "register"
			? "already have account?"
			: "Suddenly i remember! Go back to login page!";

	const mainProps = { formType, formTypeText, switchForm, text, textLink };

	return (
		<Card
			aria-label="section-auth"
			className="w-full max-w-[640px] min-w-[420px] mx-auto mt-8 p-8 flex flex-col gap-8"
		>
			<AuthCardHeader {...mainProps} />
			<AuthCardContent formType={formType} switchForm={switchForm} />
			<AuthCardFooter
				formTypeText={formTypeText}
				switchForm={switchForm}
				formType={formType}
			/>
		</Card>
	);
}
