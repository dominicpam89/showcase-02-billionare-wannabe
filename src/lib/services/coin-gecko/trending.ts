import { headers, rootUrl } from "@/lib/services/coin-gecko/util";
import { ApiResponse } from "@/lib/definition/trending-coins.type";

export async function getTrendingCoins() {
	try {
		const response = await fetch(rootUrl + "search/trending", {
			headers,
			method: "GET",
		});
		if (!response.ok) throw new Error("Couldn't fetch response");
		const data = await response.json();
		if (!data) throw new Error("There isn't any data");
		return data as ApiResponse;
	} catch (err) {
		throw err;
	}
}
