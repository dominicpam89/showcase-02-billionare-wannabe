import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import ItemContainer from "./ItemContainer";
import Container from "./Container";

interface Props {
	data: ApiResponseTrendingCoins["coins"];
}
export default function Coins({ data }: Props) {
	return (
		<Container>
			{data.map((coin, index) => {
				return (
					<ItemContainer
						isLastIndex={index == data.length - 1}
						label="coin-container"
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
