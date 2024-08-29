import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
	title: string;
	message: string;
	refetch: () => void;
}
export default function ErrorUI({ title, message, refetch }: Props) {
	return (
		<Card aria-label="card-error">
			<CardHeader>
				<CardTitle aria-label="title">{title}</CardTitle>
				<CardDescription
					aria-label="description"
					className="text-destructive dark:text-red-400"
				>
					{message}
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex-end">
				<Button variant="outline" onClick={refetch}>
					Try Again
				</Button>
			</CardFooter>
		</Card>
	);
}
