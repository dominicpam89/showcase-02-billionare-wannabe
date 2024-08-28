import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils.ts";
import ContextGlobalProvider from "./lib/context/global.context.tsx";
import { Toaster } from "@/components/ui/toaster";
import ContextCoinGeckoProvider from "./lib/context/coingecko.context.tsx";
import ContextAssetSelectProvider from "./lib/context/select-asset.context.tsx";
import ContextUserCurrencyProvider from "./lib/context/user-currency.context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ContextGlobalProvider>
				<ContextAssetSelectProvider>
					<ContextUserCurrencyProvider>
						<ContextCoinGeckoProvider>
							<App />
						</ContextCoinGeckoProvider>
					</ContextUserCurrencyProvider>
				</ContextAssetSelectProvider>
				<Toaster />
			</ContextGlobalProvider>
		</QueryClientProvider>
	</StrictMode>
);
