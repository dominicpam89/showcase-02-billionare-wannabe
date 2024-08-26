import { Ping } from "@/lib/services/coin-gecko/ping";
import { useQuery } from "@tanstack/react-query";

export const usePing = () => {
	const pingState = useQuery({
		queryKey: ["ping"],
		queryFn: Ping,
	});
	return { ...pingState };
};
