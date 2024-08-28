import TrendingCoins from "./main-app/TrendingCoins";
import ChartItem from "./main-app/ChartItem";
import Navbar from "./common/Navbar";
import ContextAssetSelectProvider from "@/lib/context/select-asset.context";

export default function MainApp() {
	return (
		<>
			<Navbar />
			<div
				aria-label="main-app-container"
				className="flex flex-col md:flex-row gap-8 w-full mt-[80px]"
			>
				<ContextAssetSelectProvider>
					<TrendingCoins />
					<ChartItem />
				</ContextAssetSelectProvider>
			</div>
		</>
	);
}
