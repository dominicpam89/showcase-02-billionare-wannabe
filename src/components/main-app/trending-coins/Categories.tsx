import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Container from "./Container";
import ItemContainer from "./ItemContainer";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { Category } from "@/lib/context/select-asset.context.type";
import { useCallback } from "react";

interface Props {
	data: ApiResponseTrendingCoins["categories"];
}
export default function Categories({ data }: Props) {
	const { onSelectItem, selected, isCategory } = useContextAssetSelect();
	const handleCategorySelect = useCallback(
		(c: Category) => () => onSelectItem(c),
		[onSelectItem]
	);
	const isSelected = useCallback(
		(category: Category) => {
			if (isCategory(selected)) {
				return selected.id == category.id;
			} else return false;
		},
		[isCategory, selected]
	);
	return (
		<Container>
			{data.map((category, index) => {
				return (
					<ItemContainer
						key={category.id}
						isLastIndex={index == data.length - 1}
						isSelected={isSelected(category)}
						label="category-container"
						onClick={handleCategorySelect(category)}
					>
						<div
							aria-label="category-item"
							className="flex gap-2 items-center"
						>
							<div className="w-1/3 text-left">
								({category.coins_count}) coins
							</div>
							<h2>{category.name}</h2>
						</div>
					</ItemContainer>
				);
			})}
		</Container>
	);
}
