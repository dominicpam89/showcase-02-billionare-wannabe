import TrendingCoins from "./main-app/TrendingCoins";
import ListAll from "./main-app/ListAll";

export default function MainApp() {
	return (
		<div
			aria-label="main-app-container"
			className="flex flex-col md:flex-row gap-8 w-full"
		>
			<TrendingCoins />
			<ListAll />
		</div>
	);
}
