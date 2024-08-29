import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import UserAvatar from "./UserAvatar";
import { ToggleTheme } from "./ToggleTheme";

export default function NavbarMenuUserInfo() {
	const { currentUser } = useContextGlobal();
	return (
		<div
			aria-label="user-info"
			className="w-full pb-4 flex flex-col gap-2 items-center"
		>
			<UserAvatar />
			<h2 className="font-semibold">{currentUser?.displayName}</h2>
			<ToggleTheme />
		</div>
	);
}
