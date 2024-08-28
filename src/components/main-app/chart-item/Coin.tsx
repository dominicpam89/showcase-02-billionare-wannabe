import { Coin } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";

export default function ChartCoin() {
	const { item } = useContextAssetSelect().selected as Coin;
	return (
		<>
			<h1>ChartCoin</h1>
			<p>{item.name}</p>
		</>
	);
}
