import { Button } from "@/components/ui/button";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
	const { logout, logoutState } = useContextGlobal();
	return (
		<Button
			aria-label="logout-button"
			variant="ghost"
			className="flex items-center w-full"
			onClick={() => logout()}
			disabled={logoutState.isPending}
		>
			<span className="mr-4 size-4">
				<LogOutIcon />
			</span>
			<span>Logout</span>
		</Button>
	);
}
