import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { CardFooter } from "../ui/card";

interface Props {
	formTypeText: string;
}
export default function AuthCardFooter({ formTypeText }: Props) {
	return (
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
	);
}
