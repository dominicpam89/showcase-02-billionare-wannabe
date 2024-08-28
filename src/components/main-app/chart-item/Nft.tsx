import { Nft } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";

export default function ChartNFT() {
	const data = useContextAssetSelect().selected as Nft;
	return (
		<>
			<h1>ChartNFT</h1>
			<p>{data.name}</p>
		</>
	);
}
