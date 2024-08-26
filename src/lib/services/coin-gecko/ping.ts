import { headers, rootUrl } from "./util";

export async function Ping() {
	try {
		const response = await fetch(rootUrl + "ping", {
			headers,
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}
