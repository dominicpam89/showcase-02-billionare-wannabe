import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Container from "./Container";
import ItemContainer from "./ItemContainer";

interface Props {
	data: ApiResponseTrendingCoins["categories"];
}
export default function Categories({ data }: Props) {
	return (
		<Container>
			{data.map((category, index) => {
				return (
					<ItemContainer
						isLastIndex={index == data.length - 1}
						label="category-container"
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
