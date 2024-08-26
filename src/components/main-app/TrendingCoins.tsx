import { useListTrending } from "@/lib/hooks/coin-gecko/useListTrending";
import ErrorUI from "../common/ErrorUI";

// Homework: add skeleton for list coins when loading
// Create collapsible data from coins, categories, nfts
// each and inside of coins, categories, and nfts, are table of content, and display necessary information
// if clicked then it would open the view detail of item
// if possible create context for managing UI (pages or tabs)

export default function TrendingCoins() {
	const { data, isLoading, isError, error } = useListTrending();
	if (isLoading) return <>Temporary loading UI</>;
	console.log("coins", data?.coins);
	console.log("categories", data?.categories);
	console.log("nfts", data?.nfts);
	console.log("errors", error);
	return (
		<div
			aria-label="list-trending"
			className="min-w-[320px] lg:min-w-[480px] flex flex-col gap-6"
		>
			{isError && (
				<ErrorUI
					title={"Error Fetching Trending Coins"}
					message={error.message}
				/>
			)}
			Trending Coins
		</div>
	);
}
