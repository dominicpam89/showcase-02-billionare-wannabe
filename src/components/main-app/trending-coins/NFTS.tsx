import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";

interface Props {
	data: ApiResponseTrendingCoins["nfts"];
}
export default function NFTS({ data }: Props) {
	console.log("from NFTS component", data);
	return <>TrendingNFTS</>;
}
