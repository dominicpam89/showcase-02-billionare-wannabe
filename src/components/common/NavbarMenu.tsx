import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function NavbarMenu() {
	return (
		<Sheet>
			<SheetTrigger>
				<MenuIcon className="size-6" />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete
						your account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
