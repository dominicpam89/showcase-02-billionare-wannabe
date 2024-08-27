import { useContext } from "react";
import {
	ContextCoinGecko,
	ContextCoinGeckoType,
} from "../context/coingecko.context";

export const useCoinGecko = () => {
	const context = useContext(ContextCoinGecko);
	return context as ContextCoinGeckoType;
};
