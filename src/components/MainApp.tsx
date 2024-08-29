import TrendingCoins from "./main-app/TrendingCoins";
import ChartItem from "./main-app/ChartItem";
import Navbar from "./common/Navbar";

export default function MainApp() {
	return (
		<>
			<Navbar />
			<div
				aria-label="main-app-container"
				className="flex flex-col md:flex-row gap-14 md:gap-16 w-full mt-[80px]"
			>
				<TrendingCoins />
				<ChartItem />
			</div>
		</>
	);
}
