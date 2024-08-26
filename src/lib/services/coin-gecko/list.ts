import { headers, rootUrl } from "./util";

export async function getCoinList() {
	try {
		const response = await fetch(rootUrl + "coins/list", {
			headers,
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}
