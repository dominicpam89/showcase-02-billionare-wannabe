import { Button } from "@/components/ui/button";

interface Props {
	switchForm: AuthSwitchFormType;
}
export default function Login({ switchForm }: Props) {
	return (
		<>
			<h1>Login Form</h1>
			<Button onClick={() => switchForm("register")}>
				Switch to Register
			</Button>
		</>
	);
}
