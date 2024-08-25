import { useCallback, useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
	const [formType, setFormType] = useState<AuthFormType>("login");
	const switchForm = useCallback((t: AuthFormType) => setFormType(t), []);
	return (
		<section aria-label="section-auth" className="w-full max-w-lg mx-auto">
			{formType == "login" && <Login switchForm={switchForm} />}
			{formType == "register" && <Register switchForm={switchForm} />}
		</section>
	);
}
