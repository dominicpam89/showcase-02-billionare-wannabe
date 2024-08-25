import { useContextGlobal } from "./lib/hooks/useContextGlobal";
import { Button } from "@/components/ui/button";

export default function App() {
	const { currentUser, loginGoogle } = useContextGlobal();
	console.log(currentUser);
	return (
		<div className="w-full p-12 flex flex-col justify-center">
			<Button onClick={() => loginGoogle()}>Test login with google</Button>
		</div>
	);
}
