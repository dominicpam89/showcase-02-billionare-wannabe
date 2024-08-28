import { Coin } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";
import MainItemContainer from "../chart-item-ui/MainItemContainer";
import MainItemHeader from "../chart-item-ui/MainItemHeader";
import HeaderImage from "../chart-item-ui/HeaderImage";
import HeaderText from "../chart-item-ui/HeaderText";
import HeaderTitle from "../chart-item-ui/HeaderTitle";
import HeaderDescription from "../chart-item-ui/HeaderDescription";
// import { useContextUserCurrency } from "@/lib/hooks/useContextUserCurrency";

export default function ChartCoin() {
	const { item } = useContextAssetSelect().selected as Coin;
	// const { currentCurrency } = useContextUserCurrency();
	const { coinGecko, useGetCoin } = useContextCoinGecko();
	const { data, isLoading, isError, error } = useGetCoin(coinGecko, item.id);
	if (isError) return <p>Errors: {error.message}</p>;
	if (isLoading) return <p>Loading...</p>;
	console.log(data);
	return (
		<MainItemContainer>
			<MainItemHeader>
				<HeaderImage src={item.large} alt={item.name} />
				<HeaderText>
					<HeaderTitle
						name={item.name}
						marketCapRank={item.market_cap_rank}
					/>
					<HeaderDescription description={data!.description.en} />
				</HeaderText>
			</MainItemHeader>
		</MainItemContainer>
	);
}
