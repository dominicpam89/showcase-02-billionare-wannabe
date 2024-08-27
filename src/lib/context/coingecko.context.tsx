import { CoinGecko } from "@/lib/services/coin-gecko";
import { createContext } from "react";
import {
	UseGetAllCoins,
	UseGetTrendingList,
	UsePing,
	UseCurrentCurrency,
	usePing,
	useGetTrendingList,
	useGetAllCoins,
	useCurrentCurrency,
} from "./coingecko.context.hook";

export type ContextCoinGeckoType = {
	coinGecko: CoinGecko;
	usePing: UsePing;
	useGetTrendingList: UseGetTrendingList;
	useGetAllCoins: UseGetAllCoins;
	useCurrentCurrency: UseCurrentCurrency;
};
export const ContextCoinGecko = createContext<ContextCoinGeckoType | {}>({});

interface Props {
	children: React.ReactNode;
}
export default function ContextCoinGeckoProvider({ children }: Props) {
	const coinGecko = new CoinGecko();
	return (
		<ContextCoinGecko.Provider
			value={{
				coinGecko,
				usePing,
				useGetTrendingList,
				useGetAllCoins,
				useCurrentCurrency,
			}}
		>
			{children}
		</ContextCoinGecko.Provider>
	);
}
