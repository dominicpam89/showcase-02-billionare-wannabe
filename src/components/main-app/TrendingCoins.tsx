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

export default function TrendingCoins() {
	const { coinGecko, useGetTrendingList } = useContextCoinGecko();
	const { data, isLoading, error, isError, isSuccess, isFetched } =
		useGetTrendingList(coinGecko);
	if (isLoading) return <>Temporary loading UI</>;
	return (
		<div
			aria-label="list-trending"
			className="min-w-[280px] lg:min-w-[320px] flex flex-col gap-6"
		>
			{isError && (
				<ErrorUI
					title={"Error Fetching Trending Coins"}
					message={error.message}
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
