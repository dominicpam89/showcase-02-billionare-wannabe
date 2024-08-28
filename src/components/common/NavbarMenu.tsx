import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import FormUpdateProfile from "../main-app/FormUpdateProfile";
import { useState } from "react";
import UserAvatar from "./UserAvatar";

export default function NavbarMenu() {
	const [open, setOpen] = useState(false);
	const onOpenChange = (o: boolean) => setOpen(o);
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger>
				<MenuIcon className="size-6" />
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-8 overflow-scroll p-8">
				<SheetHeader>
					<UserAvatar />
					<SheetTitle>Edit Your Profile</SheetTitle>
					<SheetDescription>
						You can edit your profile as you wish your grace!
					</SheetDescription>
				</SheetHeader>
				{/* Form update profile as main content */}
				<FormUpdateProfile />
			</SheetContent>
		</Sheet>
	);
}
