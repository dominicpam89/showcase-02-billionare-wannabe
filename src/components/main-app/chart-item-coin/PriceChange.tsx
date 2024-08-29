import { TrendingUp as UpTrend, TrendingDown as DownTrend } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface Props {
	priceChange: number;
}
export default function PriceChange({ priceChange }: Props) {
	const [open, setOpen] = useState(true);
	const onOpenChange = (o: boolean) => setOpen(o);
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip open={open} onOpenChange={onOpenChange}>
				<TooltipTrigger className="flex gap-2">
					Change{" "}
					{priceChange > 0 ? (
						<UpTrend className="text-emerald-800 dark:text-emerald-400" />
					) : (
						<DownTrend className="text-rose-800 dark:text-rose-400" />
					)}
				</TooltipTrigger>
				<TooltipContent onClick={() => setOpen(false)}>
					<p>Price changes in 24 hours</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
