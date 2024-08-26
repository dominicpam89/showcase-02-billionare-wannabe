import { FaPiggyBank } from "react-icons/fa";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface Props {
	formType: AuthFormType;
	switchForm: (formType: AuthFormType) => void;
	formTypeText: string;
	text: string;
}
export default function AuthCardHeader({
	formType,
	formTypeText,
	switchForm,
	text,
}: Props) {
	return (
		<CardHeader className="text-center">
			<div className="relative size-8 w-full text-center mb-4 text-primary">
				<FaPiggyBank className="w-full h-full" />
			</div>
			<CardTitle className="text-primary font-bold">
				{formTypeText} to be Billionare
			</CardTitle>
			<CardDescription
				className="text-base underline underline-offset-2 cursor-pointer transform hover:opacity-80"
				onClick={() => switchForm(formType)}
			>
				{text}
			</CardDescription>
		</CardHeader>
	);
}
