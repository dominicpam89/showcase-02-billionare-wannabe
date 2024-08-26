import { CardContent } from "@/components/ui/card";
import Login from "./AuthCardContent/Login";
import Register from "./AuthCardContent/Register";
import ForgetPassword from "./AuthCardContent/ForgetPassword";

export interface Props {
	formType: AuthFormType;
	switchForm: (t: AuthFormType) => void;
}
export default function AuthCardContent({ formType, switchForm }: Props) {
	return (
		<CardContent>
			{formType == "login" && <Login />}
			{formType == "register" && <Register />}
			{formType == "reset-password" && (
				<ForgetPassword switchForm={switchForm} />
			)}
		</CardContent>
	);
}
