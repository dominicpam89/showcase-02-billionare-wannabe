import { createContext, PropsWithChildren, useCallback, useState } from "react";

export type ContextUserCurrencyType = {
	currencies: UserCurrency[];
	currentCurrency: UserCurrency;
	onChangeCurrentCurrency: (c: UserCurrency) => void;
};
export const ContextUserCurrency =
	createContext<ContextUserCurrencyType | null>(null);

export default function ContextUserCurrencyProvider({
	children,
}: PropsWithChildren) {
	const [currentCurrency, setCurrentCurrency] = useState<UserCurrency>("usd");
	const onChangeCurrentCurrency = useCallback(
		(c: UserCurrency) => setCurrentCurrency(c),
		[]
	);
	const currencies: UserCurrency[] = ["usd", "eur", "idr"];
	return (
		<ContextUserCurrency.Provider
			value={{ currencies, currentCurrency, onChangeCurrentCurrency }}
		>
			{children}
		</ContextUserCurrency.Provider>
	);
}
