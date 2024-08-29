import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";

const chartConfig = {
	price: {
		label: "Price",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

interface Props {
	coinId: string;
	currency: UserCurrency;
	timeframe: keyof MarketChartTimeFramesQuery;
	sentiment: {
		sentimentVoteDown: number;
		sentimentVoteUp: number;
	};
}
export default function CoinChart({
	coinId,
	currency,
	timeframe,
	sentiment,
}: Props) {
	const { coinGecko, useGetCoinChartData } = useContextCoinGecko();
	const { data, isLoading, isError, error } = useGetCoinChartData(
		coinGecko,
		coinId,
		currency,
		timeframe
	);
	if (isLoading) return <p>...loading</p>;
	if (isError) return <p>error: {error.message}</p>;

	// if data is ready
	const chartData = data?.prices.map(([timestamp, price]) => {
		return { timestamp, price };
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle></CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									formatter={(value) => (value as Number).toFixed(10)}
								/>
							}
						/>
						<Line
							dataKey="price"
							type="linear"
							stroke="var(--color-price)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex gap-8 items-center justify-center text-sm">
				<div className="flex gap-2 items-center">
					<span className="text-xs">Sentiment to Buy</span>
					<TrendingUp className="text-emerald-500" />
					<span>{sentiment.sentimentVoteUp}%</span>
				</div>
				<div className="flex gap-2 items-center">
					<span className="text-xs">Sentiment to Sell</span>
					<TrendingDown className="text-destructive" />
					<span>{sentiment.sentimentVoteDown}%</span>
				</div>
			</CardFooter>
		</Card>
	);
}
