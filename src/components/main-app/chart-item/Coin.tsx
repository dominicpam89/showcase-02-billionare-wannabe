import { Coin } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";
// import { useContextUserCurrency } from "@/lib/hooks/useContextUserCurrency";

export default function ChartCoin() {
	const { item } = useContextAssetSelect().selected as Coin;
	// const { currentCurrency } = useContextUserCurrency();
	const { coinGecko, useGetCoin } = useContextCoinGecko();
	const { data, isLoading, isError, error } = useGetCoin(coinGecko, item.id);
	console.log("ChartCoin.tsx is rendered");
	/** 
	 	Left Side:
			- item.small
			- item.symbol
			- item.market_cap_rank
		Right Side:
			- item.data.total_volume
			- item.data.market_cap
			- 
	*/
	if (isError) return <p>Errors: {error.message}</p>;
	if (isLoading) return <p>Loading...</p>;
	console.log(data);
	return (
		<>
			<h1>ChartCoin</h1>
			<p>{item.name}</p>
		</>
	);
}
