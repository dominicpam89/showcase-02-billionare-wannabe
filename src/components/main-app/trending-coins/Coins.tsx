import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Coin from "./Coin";

interface Props {
	data: ApiResponseTrendingCoins["coins"];
}
export default function Coins({ data }: Props) {
	console.log("from Coins component", data);
	return (
		<div
			aria-label="trending-coins-container"
			className="flex flex-col gap-4 w-full"
		>
			{data.map((coin) => {
				return <Coin data={coin} />;
			})}
		</div>
	);
}
