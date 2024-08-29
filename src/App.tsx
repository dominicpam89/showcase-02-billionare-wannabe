import Auth from "@/components/auth/Auth";
import MainLayout from "@/components/common/MainLayout";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import LoadingUI from "./components/common/LoadingUI";
import MainEntry from "./components/main-entry/MainEntry";
import ScrollTop from "./components/common/ScrollTop";

export default function App() {
	const { currentUser, mainState } = useContextGlobal();
	return (
		<MainLayout>
			{mainState.isLoading && <LoadingUI shown={mainState.isLoading} />}
			{mainState.isFetched && !currentUser && <Auth />}
			{mainState.isFetched && currentUser && <MainEntry />}
			<ScrollTop />
		</MainLayout>
	);
}
