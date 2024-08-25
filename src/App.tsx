import { useContextGlobal } from "./lib/hooks/useContextGlobal";
import { Button } from "@/components/ui/button";

export default function App() {
	const { currentUser, loginGoogle, logoutGoogle, logoutState } =
		useContextGlobal();
	console.log("currentUser", currentUser);
	console.log("logoutState status", logoutState.status);
	return (
		<div className="w-full p-12 flex flex-col gap-4 justify-center">
			<Button onClick={() => loginGoogle()}>Test login with google</Button>
			{currentUser && <Button onClick={() => logoutGoogle()}>Logout</Button>}
		</div>
	);
}
