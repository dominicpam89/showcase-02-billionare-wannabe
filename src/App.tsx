import Auth from "@/components/auth/Auth";
import MainLayout from "@/components/common/MainLayout";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function App() {
	const { currentUser } = useContextGlobal();
	return (
		<MainLayout>
			{!currentUser && <Auth />}
			{currentUser && <div>Protected Resources</div>}
		</MainLayout>
	);
}
