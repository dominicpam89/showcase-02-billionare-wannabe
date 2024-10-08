import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Container from "./Container";
import ItemContainer from "./ItemContainer";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { Nft } from "@/lib/context/select-asset.context.type";
import { useCallback } from "react";

interface Props {
	data: ApiResponseTrendingCoins["nfts"];
}
export default function NFTS({ data }: Props) {
	const { onSelectItem, isNFT, selected } = useContextAssetSelect();
	const handleNftSelect = useCallback(
		(nft: Nft) => () => onSelectItem(nft),
		[onSelectItem]
	);
	const isSelected = useCallback(
		(nft: Nft) => {
			if (isNFT(selected)) {
				return selected.id == nft.id;
			} else return false;
		},
		[isNFT, selected]
	);
	return (
		<Container>
			{data.map((nft, index) => {
				return (
					<ItemContainer
						key={nft.id}
						isLastIndex={index == data.length - 1}
						isSelected={isSelected(nft)}
						label="nft-container"
						onClick={handleNftSelect(nft)}
					>
						<div
							aria-label="nft-item"
							className="flex gap-2 items-center"
						>
							<img
								src={nft.thumb}
								alt={nft.name}
								height={40}
								width={40}
								className="size-5"
							/>
							<h2>{nft.symbol}</h2>
						</div>
					</ItemContainer>
				);
			})}
		</Container>
	);
}
