import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
	description: string;
}
export default function HeaderDescription({ description }: Props) {
	return (
		<ScrollArea
			aria-label="description"
			className="h-full rounded-md text-sm tracking-wider leading-6"
		>
			{description}
		</ScrollArea>
	);
}
