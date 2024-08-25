import { Button } from "@/components/ui/button";

interface Props {
	switchForm: AuthSwitchFormType;
}
export default function Register({ switchForm }: Props) {
	return (
		<>
			<h1>Register Form</h1>
			<Button onClick={() => switchForm("login")}>Switch to Login</Button>
		</>
	);
}
