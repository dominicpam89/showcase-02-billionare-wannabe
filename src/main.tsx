import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils.ts";
import ContextGlobalProvider from "./lib/context/global.context.tsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ContextGlobalProvider>
				<App />
				<Toaster />
			</ContextGlobalProvider>
		</QueryClientProvider>
	</StrictMode>
);
