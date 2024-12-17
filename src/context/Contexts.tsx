import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StackDetailsProvider } from "./StackDetailsContext";

const queryClient = new QueryClient();

export function Contexts({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<StackDetailsProvider>{children}</StackDetailsProvider>
		</QueryClientProvider>
	);
}
