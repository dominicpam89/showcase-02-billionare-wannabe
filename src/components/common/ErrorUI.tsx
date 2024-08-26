import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
	title: string;
	message: string;
}
export default function ErrorUI({ title, message }: Props) {
	const [show, setShow] = useState(true);
	if (show)
		return (
			<Card aria-label="card-error">
				<CardHeader>
					<CardTitle aria-label="title">{title}</CardTitle>
					<CardDescription
						aria-label="description"
						className="text-destructive"
					>
						{message}
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex-end">
					<Button variant="outline" onClick={() => setShow(false)}>
						Dismiss
					</Button>
				</CardFooter>
			</Card>
		);
	else return null;
}
