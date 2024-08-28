import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import { ApiResponseCoinType } from "../definition/coin.type";

export class CoinGecko {
	private headers: HeadersInit = {
		"accept": "application/json",
		"x-cg-demo-api-key": this.APIkey,
	};
	constructor(
		private rootUrl: string = "https://api.coingecko.com/api/v3/",
		private APIkey: string = import.meta.env.VITE_COIN_GECKO_API_KEY
	) {}

	async Ping() {
		try {
			const response = await fetch(this.rootUrl + "ping", {
				headers: this.headers,
				method: "GET",
			});
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	async getTrendingCoins() {
		try {
			const response = await fetch(this.rootUrl + "search/trending", {
				headers: this.headers,
				method: "GET",
			});
			if (!response.ok) throw new Error("Couldn't fetch response");
			const data = await response.json();
			if (!data) throw new Error("There isn't any data");
			return data as ApiResponseTrendingCoins;
		} catch (err) {
			throw err;
		}
	}

	async getAllCoins() {
		try {
			const response = await fetch(this.rootUrl + "coins/list", {
				headers: this.headers,
				method: "GET",
			});
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	async getCoin(coinId: string) {
		try {
			const response = await fetch(this.rootUrl + "coins/" + coinId, {
				headers: this.headers,
				method: "GET",
			});
			const data = await response.json();
			return data as ApiResponseCoinType;
		} catch (error) {
			throw error;
		}
	}
}
