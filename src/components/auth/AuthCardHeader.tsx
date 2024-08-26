import { FaPiggyBank } from "react-icons/fa";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Props {
	formType: AuthFormType;
	switchForm: (formType: AuthFormType) => void;
	formTypeText: string;
	text: string;
	textLink: string;
}
export default function AuthCardHeader({
	formType,
	formTypeText,
	switchForm,
	text,
	textLink,
}: Props) {
	const handleSwitchForm = () => {
		if (formType == "login") switchForm("register");
		else switchForm("login");
	};
	return (
		<CardHeader className="text-center">
			<div className="relative size-8 w-full text-center mb-4 text-primary">
				<FaPiggyBank aria-label="mock-logo" className="w-full h-full" />
			</div>
			<CardTitle className="text-primary font-bold">
				{formTypeText}
			</CardTitle>
			<CardDescription
				className="text-base cursor-pointer transition-default transform hover:opacity-80"
				onClick={handleSwitchForm}
			>
				{text + " "}
				<span className="underline underline-offset-2">{textLink}</span>
			</CardDescription>
		</CardHeader>
	);
}
