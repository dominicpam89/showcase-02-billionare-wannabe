import { Skeleton } from "@/components/ui/skeleton";

export default function CoinLoading() {
	return (
		<div aria-label="coin-detail" className="w-full flex flex-col gap-6">
			<div
				aria-label="header-skeleton"
				className="w-full flex flex-col lg:flex-row gap-6 lg:gap-9 h-[200px]"
			>
				<Skeleton
					aria-label="header-image-skeleton"
					className="h-full w-full lg:w-2/4"
				/>
				<div
					aria-label="header-text-skeleton"
					className="w-full h-full flex flex-col gap-4"
				>
					<Skeleton
						aria-label="header-text-title"
						className="w-full h-10"
					/>
					<Skeleton
						aria-label="header-text-description"
						className="w-full h-full"
					/>
				</div>
			</div>
			<Skeleton aria-label="body-skeleton" className="w-full h-[320px]" />
		</div>
	);
}
