import { useCallback, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import AuthCard from "./AuthCard";

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

	const authCardProps = { formType, formTypeText, text, switchForm };

	return (
		<AuthCard {...authCardProps}>
			{formType == "login" && <Login />}
			{formType == "register" && <Register />}
		</AuthCard>
	);
}
