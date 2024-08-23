import { createContext, PropsWithChildren } from "react";
import {
	UseGlobalContextStateType,
	useGlobalContextState,
} from "./global.context.hook";

export const ContextGlobal = createContext<
	UseGlobalContextStateType | undefined
>(undefined);

export default function ContextGlobalProvider({ children }: PropsWithChildren) {
	const contextValues = useGlobalContextState();
	return (
		<ContextGlobal.Provider value={{ ...contextValues }}>
			{children}
		</ContextGlobal.Provider>
	);
}
