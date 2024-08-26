import { CardContent } from "@/components/ui/card";
import Login from "./AuthCardContent/Login";
import Register from "./AuthCardContent/Register";

export interface Props {
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
