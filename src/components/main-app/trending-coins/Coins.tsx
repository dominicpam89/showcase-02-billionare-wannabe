import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";

interface Props {
	data: ApiResponseTrendingCoins["coins"];
}
export default function Coins({ data }: Props) {
	console.log("from Coins component", data);
	return <>Trending Coins</>;
}
