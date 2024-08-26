import Auth from "@/components/auth/Auth";
import MainLayout from "@/components/common/MainLayout";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import LogoutButton from "./components/common/LogoutButton";
import LoadingUI from "./components/common/LoadingUI";
import MainEntry from "./components/main-entry/MainEntry";

export default function App() {
	const { currentUser, mainState } = useContextGlobal();
	return (
		<MainLayout>
			{mainState.isLoading && <LoadingUI shown={mainState.isLoading} />}
			{mainState.isFetched && !currentUser && <Auth />}
			{mainState.isFetched && currentUser && (
				<>
					<MainEntry />
					<LogoutButton />
				</>
			)}
		</MainLayout>
	);
}
