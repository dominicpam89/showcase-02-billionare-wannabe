import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingCoinsLoading() {
	return (
		<div className="w-[240px] lg:w-[320px] h-[240px] lg:h-[320px] flex flex-col gap-5">
			{[1, 2, 3].map((key) => (
				<div className="flex justify-between" key={key}>
					<Skeleton className="w-3/6 h-6" />
					<Skeleton className="w-1/6 h-6" />
				</div>
			))}
		</div>
	);
}
