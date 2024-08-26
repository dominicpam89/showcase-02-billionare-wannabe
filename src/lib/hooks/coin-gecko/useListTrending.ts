import { useQuery } from "@tanstack/react-query";
import { getTrendingCoins } from "@/lib/services/coin-gecko/trending";

export const useListTrending = () => {
	const listTrendingState = useQuery({
		queryKey: ["coins", "trending"],
		queryFn: getTrendingCoins,
	});
	return listTrendingState;
};
