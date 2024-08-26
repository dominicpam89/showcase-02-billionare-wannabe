import { useQuery } from "@tanstack/react-query";
import { getCoinList } from "@/lib/services/coin-gecko/list";

export const useListCoins = () => {
	const listState = useQuery({
		queryKey: ["coins"],
		queryFn: getCoinList,
	});
	return listState;
};
