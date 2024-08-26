import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import UnverifiedUser from "./UnverifiedUser";
import MainApp from "@/components/MainApp";

export default function MainEntry() {
	const { currentUser } = useContextGlobal();
	if (!currentUser!.emailVerified) return <UnverifiedUser />;
	else return <MainApp />;
}
