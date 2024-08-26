import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog-noclose";

interface Props {
	shown: boolean;
}
export default function LoadingUI({ shown }: Props) {
	return (
		<Dialog open={shown}>
			<DialogTrigger></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Loading content</DialogTitle>
					<DialogDescription>
						Please wait while we are loding the content.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
