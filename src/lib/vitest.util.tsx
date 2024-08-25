import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextGlobal } from "@/lib/context/global.context";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
}

interface Props {
	readonly children: React.ReactNode;
	contextValue: {};
}
export const Wrapper = ({ children, contextValue = {} }: Props) => {
	const queryClient = createTestQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ContextGlobal.Provider value={{ ...contextValue }}>
				{children}
			</ContextGlobal.Provider>
		</QueryClientProvider>
	);
};
