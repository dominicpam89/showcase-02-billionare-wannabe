import { Coin } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";
import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";
import MainItemContainer from "../chart-item-coin/MainItemContainer";
import MainItemHeader from "../chart-item-coin/MainItemHeader";
import HeaderImage from "../chart-item-coin/HeaderImage";
import HeaderText from "../chart-item-coin/HeaderText";
import HeaderTitle from "../chart-item-coin/HeaderTitle";
import HeaderDescription from "../chart-item-coin/HeaderDescription";
import { useContextUserCurrency } from "@/lib/hooks/useContextUserCurrency";
import MainItemBody from "../chart-item-coin/MainItemBody";
import BodyHeader from "../chart-item-coin/BodyHeader";
import BodyHeaderItem from "../chart-item-coin/BodyHeaderItem";
import { TrendingUp as UpTrend, TrendingDown as DownTrend } from "lucide-react";
import { formatCurrency, formatFractions } from "@/lib/utils";
import BodyContent from "../chart-item-coin/BodyContent";
import CoinChart from "./CoinChart";

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

	const sentiment = {
		sentimentVoteDown: data!.sentiment_votes_down_percentage,
		sentimentVoteUp: data!.sentiment_votes_up_percentage,
	};
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
				<BodyContent
					monthlyChart={
						<CoinChart
							coinId={data!.id}
							currency={currentCurrency}
							timeframe="monthly"
							sentiment={sentiment}
						/>
					}
					dailyChart={
						<CoinChart
							coinId={data!.id}
							currency={currentCurrency}
							timeframe="daily"
							sentiment={sentiment}
						/>
					}
					hourlyChart={
						<CoinChart
							coinId={data!.id}
							currency={currentCurrency}
							timeframe="hourly"
							sentiment={sentiment}
						/>
					}
				/>
			</MainItemBody>
		</MainItemContainer>
	);
}
