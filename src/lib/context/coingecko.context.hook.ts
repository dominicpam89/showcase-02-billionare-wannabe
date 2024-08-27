import { useQuery } from "@tanstack/react-query";
import { CoinGecko } from "../services/coin-gecko";

export const usePing = (coinGecko: CoinGecko) => {
	const pingState = useQuery({
		queryKey: ["ping"],
		queryFn: coinGecko.Ping.bind(coinGecko),
	});
	return { ...pingState };
};
// returning the function type, since the function would be used to be called later in the app
export type UsePing = typeof usePing;

export const useGetTrendingList = (coinGecko: CoinGecko) => {
	const listTrendingState = useQuery({
		queryKey: ["coins", "trending"],
		queryFn: coinGecko.getTrendingCoins.bind(coinGecko),
	});
	return listTrendingState;
};
// returning the function type, since the function would be used to be called later in the app
export type UseGetTrendingList = typeof useGetTrendingList;

export const useGetAllCoins = (coinGecko: CoinGecko) => {
	const listState = useQuery({
		queryKey: ["coins"],
		queryFn: coinGecko.getAllCoins.bind(coinGecko),
	});
	return listState;
};
// returning the function type, since the function would be used to be called later in the app
export type UseGetAllCoins = typeof useGetAllCoins;
