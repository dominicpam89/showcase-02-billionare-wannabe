import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Props {
	title: string | React.ReactNode;
	description: number | string;
	descriptionColor?: "destructive" | "green" | "default";
}
export default function BodyHeaderItem({
	title,
	description,
	descriptionColor = "default",
}: Props) {
	const descClass =
		descriptionColor == "destructive"
			? "text-destructive"
			: descriptionColor == "green"
			? "text-emerald-700 dark:text-emerald-300"
			: "";
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-bold">{title}</CardTitle>
				<CardDescription className={`font-semibold ${descClass}`}>
					{description}
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
