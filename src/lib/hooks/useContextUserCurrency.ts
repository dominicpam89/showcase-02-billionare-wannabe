import { useContext } from "react";
import {
	ContextUserCurrency,
	ContextUserCurrencyType,
} from "../context/user-currency.context";

export const useContextUserCurrency = () => {
	const context = useContext(ContextUserCurrency);
	return context as ContextUserCurrencyType;
};
