import { useContextCoinGecko } from "@/lib/hooks/useCoinGecko";
import ErrorUI from "../common/ErrorUI";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Coins from "./trending-coins/Coins";
import Categories from "./trending-coins/Categories";
import NFTS from "./trending-coins/NFTS";
import TrendingCoinsLoading from "./TrendingCoins.loading";

export default function TrendingCoins() {
	const { coinGecko, useGetTrendingList } = useContextCoinGecko();
	const { data, isLoading, error, isError, isSuccess, isFetched, refetch } =
		useGetTrendingList(coinGecko);
	if (isLoading) return <TrendingCoinsLoading />;
	return (
		<div
			aria-label="list-trending"
			className="min-w-[240px] lg:min-w-[320px] flex flex-col gap-6"
		>
			{isError && (
				<ErrorUI
					title="Couldn't get data"
					message={error.message}
					refetch={refetch}
				/>
			)}
			{isFetched && isSuccess && (
				<Accordion type="single" collapsible>
					<AccordionItem value="coins">
						<AccordionTrigger>Coins</AccordionTrigger>
						<AccordionContent>
							<Coins data={data.coins} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="categories">
						<AccordionTrigger>Categories</AccordionTrigger>
						<AccordionContent>
							<Categories data={data.categories} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="nft">
						<AccordionTrigger>NFTS</AccordionTrigger>
						<AccordionContent>
							<NFTS data={data.nfts} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</div>
	);
}
