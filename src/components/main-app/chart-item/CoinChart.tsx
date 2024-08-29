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
import CoinChartLoading from "./CoinChart.loading";
import ErrorUI from "@/components/common/ErrorUI";

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
	const { data, isLoading, isError, error, refetch } = useGetCoinChartData(
		coinGecko,
		coinId,
		currency,
		timeframe
	);
	if (isLoading) return <CoinChartLoading />;
	if (isError)
		return (
			<ErrorUI
				title="Couldn't load chart"
				message={error.message}
				refetch={refetch}
			/>
		);

	// if data is ready
	const chartData = data?.prices.map(([timestamp, price]) => {
		return { timestamp, price };
	});
	return (
		<Card className="max-sm:mt-8">
			<CardHeader>
				<CardTitle></CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent aria-label="card-content" className="min-h-[320px]">
				<ChartContainer config={chartConfig} className="w-full h-[320px]">
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
			<CardFooter className="flex max-sm:flex-col gap-4 lg:gap-10 items-center justify-center text-sm">
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
