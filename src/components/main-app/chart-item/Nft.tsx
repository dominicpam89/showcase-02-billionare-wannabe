import { Nft } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import BodyHeaderItem from "../chart-item-coin/BodyHeaderItem";

export default function ChartNFT() {
	const {
		name,
		thumb,
		floor_price_24h_percentage_change: pricePercentage24,
		floor_price_in_native_currency: price,
		data: { h24_average_sale_price: avgSalePrice },
	} = useContextAssetSelect().selected as Nft;
	const pricePercentageClass = pricePercentage24 > 0 ? "green" : "destructive";

	return (
		<div aria-label="nft-container" className="w-full flex gap-4">
			<img src={thumb} alt={name} className="w-3/12 h-auto" />
			<div className="w-9/12 grid grid-cols-2 gap-3">
				<BodyHeaderItem title="Name" description={name} />
				<BodyHeaderItem
					title="Current Price"
					description={price + " ETH"}
				/>
				<BodyHeaderItem
					title="Change"
					description={pricePercentage24}
					descriptionColor={pricePercentageClass}
				/>
				<BodyHeaderItem
					title="Average Sale Price"
					description={avgSalePrice + " ETH"}
				/>
			</div>
		</div>
	);
}
