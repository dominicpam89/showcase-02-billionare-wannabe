import { useCallback, useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
	const [formType, setFormType] = useState<AuthFormType>("login");
	const switchForm = useCallback((t: AuthFormType) => setFormType(t), []);
	return (
		<section id="section-auth">
			{formType == "login" && <Login switchForm={switchForm} />}
			{formType == "register" && <Register switchForm={switchForm} />}
		</section>
	);
}
