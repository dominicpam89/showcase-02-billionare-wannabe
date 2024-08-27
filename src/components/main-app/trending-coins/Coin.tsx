import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";

interface Props {
	data: ApiResponseTrendingCoins["coins"][number];
}
export default function Coin({ data: { item } }: Props) {
	console.log(item);
	return (
		<div aria-label="coin-data" className="flex gap-2 items-center">
			<img
				src={item.small}
				alt={item.name}
				height={40}
				width={40}
				className="size-5"
			/>
			<h2>{item.name}</h2>
		</div>
	);
}
