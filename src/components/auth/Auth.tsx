import { useCallback, useState } from "react";
import { Card } from "../ui/card";
import AuthCardHeader from "./AuthCardHeader";
import AuthCardContent from "./AuthCardContent";
import AuthCardFooter from "./AuthCardFooter";

export default function Auth() {
	const [formType, setFormType] = useState<AuthFormType>("login");
	const switchForm = useCallback((t: AuthFormType) => {
		if (t == "login") setFormType("register");
		else setFormType("login");
	}, []);

	const formTypeText = formType
		.slice(0, 1)
		.toUpperCase()
		.concat(formType.slice(1));
	const text =
		formType == "login"
			? "You don't have bilionare account? Silly! Create one!"
			: "You already trying so hard to become billionare and have account?";

	const mainProps = { formType, formTypeText, text, switchForm };

	return (
		<Card
			aria-label="section-auth"
			className="w-full max-w-[640px] min-w-[420px] mx-auto mt-8 p-8 flex flex-col gap-8"
		>
			<AuthCardHeader {...mainProps} />
			<AuthCardContent formType={formType} />
			<AuthCardFooter formTypeText={formTypeText} />
		</Card>
	);
}
