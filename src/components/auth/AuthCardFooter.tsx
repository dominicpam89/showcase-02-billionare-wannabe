import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { CardFooter } from "@/components/ui/card";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

interface Props {
	formTypeText: string;
}
export default function AuthCardFooter({ formTypeText }: Props) {
	const { loginGoogle } = useContextGlobal();
	return (
		<CardFooter>
			<Button
				variant="outline"
				className="w-full"
				size="lg"
				onClick={() => loginGoogle()}
			>
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
