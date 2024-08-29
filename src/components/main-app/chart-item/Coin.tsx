import { Coin } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";
import MainItemContainer from "../chart-item-ui/MainItemContainer";
import MainItemHeader from "../chart-item-ui/MainItemHeader";
import HeaderImage from "../chart-item-ui/HeaderImage";
import HeaderText from "../chart-item-ui/HeaderText";
import HeaderTitle from "../chart-item-ui/HeaderTitle";
import HeaderDescription from "../chart-item-ui/HeaderDescription";
import { useContextUserCurrency } from "@/lib/hooks/useContextUserCurrency";
import MainItemBody from "../chart-item-ui/MainItemBody";
import BodyHeader from "../chart-item-ui/BodyHeader";
import BodyHeaderItem from "../chart-item-ui/BodyHeaderItem";
import { TrendingUp as UpTrend, TrendingDown as DownTrend } from "lucide-react";
import { formatCurrency, formatFractions } from "@/lib/utils";

export default function ChartCoin() {
	// selected asset
	const { item } = useContextAssetSelect().selected as Coin;

	// selected currency
	const { currentCurrency } = useContextUserCurrency();

	// main data
	const { coinGecko, useGetCoin } = useContextCoinGecko();
	const { data, isLoading, isError, error } = useGetCoin(coinGecko, item.id);

	// if coin data couldn't be retrieved
	if (isError) return <p>Errors: {error.message}</p>;

	// while coin data is being fetched
	if (isLoading) return <p>Loading...</p>;

	// If coin data does exist
	console.log(data);
	const currentPrice = formatCurrency(
		data!.market_data.current_price[currentCurrency],
		currentCurrency
	);
	const marketCap = formatCurrency(
		data!.market_data.market_cap[currentCurrency],
		currentCurrency
	);
	const priceChange =
		data!.market_data.price_change_percentage_24h_in_currency[
			currentCurrency
		];
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
			<MainItemBody>
				<BodyHeader>
					<BodyHeaderItem
						title="Current Price"
						description={currentPrice}
					/>
					<BodyHeaderItem title="Market Cap" description={marketCap} />
					<BodyHeaderItem
						title={priceChange > 0 ? <UpTrend /> : <DownTrend />}
						description={formatFractions(priceChange, 2, 4) + " %"}
						descriptionColor={priceChange > 0 ? "green" : "destructive"}
					/>
				</BodyHeader>
			</MainItemBody>
		</MainItemContainer>
	);
}
