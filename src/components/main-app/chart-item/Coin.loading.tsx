import { Skeleton } from "@/components/ui/skeleton";

export default function CoinLoading() {
	return (
		<div aria-label="coin-detail" className="w-full flex flex-col gap-6">
			<div
				aria-label="header-skeleton"
				className="w-full flex flex-col lg:flex-row gap-6 lg:gap-4 min-h-[200px] lg:h-[200px]"
			>
				<Skeleton
					aria-label="heading-image-skeleton"
					className="w-full h-36 lg:w-[200px] lg:h-full"
				/>
				<div
					aria-label="heading-text-skeleton"
					className="flex flex-col gap-4 lg:w-full"
				>
					<Skeleton className="w-full h-10" />
					<Skeleton className="w-full h-56" />
				</div>
			</div>
			<div
				aria-label="body-header"
				className="grid grid-cols-1 gap-4 w-full h-[320px] lg:grid-cols-3 lg:gap-5 lg:w-full lg:h-[120px]"
			>
				<Skeleton className="w-full h-full" />
				<Skeleton className="w-full h-full" />
				<Skeleton className="w-full h-full" />
			</div>
		</div>
	);
}
