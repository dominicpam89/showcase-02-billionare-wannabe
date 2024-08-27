import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Coin from "./Coin";

interface Props {
	data: ApiResponseTrendingCoins["coins"];
}
export default function Coins({ data }: Props) {
	return (
		<div
			aria-label="trending-coins-container"
			className="flex flex-col gap-4 w-full"
		>
			{data.map((coin) => {
				return <Coin key={coin.item.id} data={coin} />;
			})}
		</div>
	);
}
