import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";
import Container from "./Container";
import ItemContainer from "./ItemContainer";

interface Props {
	data: ApiResponseTrendingCoins["nfts"];
}
export default function NFTS({ data }: Props) {
	return (
		<Container>
			{data.map((nft, index) => {
				return (
					<ItemContainer
						isLastIndex={index == data.length - 1}
						label="nft-container"
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
