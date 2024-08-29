import { Skeleton } from "@/components/ui/skeleton";

export default function CoinLoading() {
	return (
		<div aria-label="coin-detail" className="w-full flex flex-col gap-6">
			<div
				aria-label="header-skeleton"
				className="w-full flex gap-6 lg:gap-9 h-[200px]"
			>
				<Skeleton
					aria-label="header-image-skeleton"
					className="h-full w-2/4"
				/>
				<div
					aria-label="header-text-skeleton"
					className="w-full h-full flex flex-col gap-2"
				>
					<Skeleton
						aria-label="header-text-title"
						className="w-full h-8"
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
