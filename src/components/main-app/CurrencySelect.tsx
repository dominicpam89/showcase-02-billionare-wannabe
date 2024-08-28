import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContextUserCurrency } from "@/lib/hooks/useContextUserCurrency";

export default function CurrencySelect() {
	const { currencies, currentCurrency, onChangeCurrentCurrency } =
		useContextUserCurrency();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{currentCurrency}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Base Currency</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={currentCurrency}
					onValueChange={(val) =>
						onChangeCurrentCurrency(val as UserCurrency)
					}
				>
					{currencies.map((currency) => {
						return (
							<DropdownMenuRadioItem key={currency} value={currency}>
								{currency}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
