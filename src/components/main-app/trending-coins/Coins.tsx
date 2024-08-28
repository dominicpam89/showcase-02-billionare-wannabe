import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import ItemContainer from "./ItemContainer";
import Container from "./Container";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { Coin } from "@/lib/context/select-asset.context.type";
import { useCallback } from "react";

interface Props {
	data: ApiResponseTrendingCoins["coins"];
}
export default function Coins({ data }: Props) {
	const { onSelectItem, isCoin, selected } = useContextAssetSelect();
	const handleCoinSelect = useCallback(
		(coin: Coin) => () => onSelectItem(coin),
		[onSelectItem]
	);
	const isSelected = useCallback(
		(coin: Coin) => {
			if (isCoin(selected)) {
				return selected.item.id == coin.item.id;
			} else return false;
		},
		[isCoin, selected]
	);
	return (
		<Container>
			{data.map((coin, index) => {
				return (
					<ItemContainer
						key={coin.item.id}
						isLastIndex={index == data.length - 1}
						isSelected={isSelected(coin)}
						label="coin-container"
						onClick={handleCoinSelect(coin)}
					>
						<div
							aria-label="coin-item"
							className="flex gap-2 items-center"
						>
							<img
								src={coin.item.small}
								alt={coin.item.name}
								height={40}
								width={40}
								className="size-5"
							/>
							<h2>{coin.item.name}</h2>
						</div>
					</ItemContainer>
				);
			})}
		</Container>
	);
}
