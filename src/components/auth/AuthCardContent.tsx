import { CardContent } from "@/components/ui/card";
import Login from "./Login";
import Register from "./Register";

interface Props {
	formType: AuthFormType;
}
export default function AuthCardContent({ formType }: Props) {
	return (
		<CardContent>
			{formType == "login" && <Login />}
			{formType == "register" && <Register />}
		</CardContent>
	);
}
