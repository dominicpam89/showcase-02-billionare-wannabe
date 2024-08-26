import Auth from "@/components/auth/Auth";
import MainLayout from "@/components/common/MainLayout";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import LogoutButton from "./components/common/LogoutButton";

export default function App() {
	const { currentUser } = useContextGlobal();
	return (
		<MainLayout>
			{!currentUser && <Auth />}
			{currentUser && (
				<div>
					<div>Protected Resources</div>
					<LogoutButton />
				</div>
			)}
		</MainLayout>
	);
}
