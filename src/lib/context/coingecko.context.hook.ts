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

export const useGetCoin = (coinGecko: CoinGecko, coinId: string) => {
	const coinState = useQuery({
		queryKey: ["coin", coinId],
		queryFn: coinGecko.getCoin.bind(coinGecko, coinId),
	});
	return coinState;
};
export type UseGetCoin = typeof useGetCoin;

export const useGetCoinChartData = (
	coinGecko: CoinGecko,
	coinId: string,
	currency: UserCurrency,
	timeFrame: keyof MarketChartTimeFramesQuery
) => {
	const coinChartState = useQuery({
		queryKey: ["coin", coinId, "chart"],
		queryFn: coinGecko.getCoinMarketChart.bind(
			coinGecko,
			coinId,
			currency,
			timeFrame
		),
	});
	return coinChartState;
};
export type UseGetCoinChartData = typeof useGetCoinChartData;
