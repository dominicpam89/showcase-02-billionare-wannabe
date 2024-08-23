import { createContext, PropsWithChildren } from "react";
import { useGlobalContextState } from "./global.context.hook";

export const ContextGlobal = createContext({});

export default function ContextGlobalProvider({ children }: PropsWithChildren) {
	const contextGlobalState = useGlobalContextState();
	return (
		<ContextGlobal.Provider value={contextGlobalState}>
			{children}
		</ContextGlobal.Provider>
	);
}
