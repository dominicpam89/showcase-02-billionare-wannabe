import TrendingCoins from "./main-app/TrendingCoins";
import ListAll from "./main-app/ListAll";
import Navbar from "./common/Navbar";

export default function MainApp() {
	return (
		<>
			<Navbar />
			<div
				aria-label="main-app-container"
				className="flex flex-col md:flex-row gap-8 w-full mt-[80px]"
			>
				<TrendingCoins />
				<ListAll />
			</div>
		</>
	);
}
