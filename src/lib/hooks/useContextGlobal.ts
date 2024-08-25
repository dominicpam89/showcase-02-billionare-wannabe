import { useContext } from "react";
import { ContextGlobal } from "../context/global.context";
import { GlobalContextState } from "@/lib/context/global.context.hook";

export const useContextGlobal = () => {
	const context = useContext(ContextGlobal);
	return context as GlobalContextState;
};
