import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function LogoutConfirmation() {
	const { logout, logoutState } = useContextGlobal();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full " variant="outline" type="button">
					<LogOutIcon className="size-3 mr-2" />
					<span>Logout</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						You will be logged out from this application! Meaning you're
						tired to be billionare!
					</DialogDescription>
				</DialogHeader>
				<Button
					type="button"
					variant="destructive"
					onClick={() => logout()}
					disabled={logoutState.isPending}
				>
					Okay
				</Button>
			</DialogContent>
		</Dialog>
	);
}
