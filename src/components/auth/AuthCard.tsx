import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FaPiggyBank } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface Props {
	readonly children: React.ReactNode;
	formType: AuthFormType;
	switchForm: (t: AuthFormType) => void;
	text: string;
	formTypeText: string;
}
export default function AuthCard({
	children,
	formType,
	formTypeText,
	switchForm,
	text,
}: Props) {
	return (
		<Card
			aria-label="section-auth"
			className="w-full max-w-[640px] min-w-[420px] mx-auto mt-8 p-8 flex flex-col gap-8"
		>
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
			<CardContent>{children}</CardContent>
			<CardFooter>
				<Button variant="outline" className="w-full" size="lg">
					<span className="mr-4">
						<FcGoogle />
					</span>
					<span>
						{formTypeText + " "}
						with Google
					</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
