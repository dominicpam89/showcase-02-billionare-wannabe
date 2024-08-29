import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import ChartCoin from "./chart-item/Coin";
import TableCategory from "./chart-item/Category";
import ChartNFT from "./chart-item/Nft";
import { useEffect, useRef } from "react";

export default function ChartItem() {
	const { selected, isCategory, isCoin, isNFT } = useContextAssetSelect();
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (selected && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [selected]);
	if (!selected)
		return (
			<div aria-label="list-empty" className="text-justify w-full">
				<h1 className="text-lg font-bold">No asset selected.</h1>
				<p>
					If you want to get rich quick and broke fast also, please select
					an asset. C'mon champ, you cannot do it!
				</p>
			</div>
		);
	return (
		<div
			ref={ref}
			aria-label="list-all"
			className="p-8 md:p-0 flex flex-col gap-6 w-full"
		>
			{isCoin(selected) && <ChartCoin />}
			{isCategory(selected) && <TableCategory />}
			{isNFT(selected) && <ChartNFT />}
		</div>
	);
}
