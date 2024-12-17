import { createContext, useState, ReactNode, useMemo, useCallback } from "react";

import { StackDetailsPanel } from "../component/StackDetailsPanel";
import { StackEnriched } from "../model/stack";

type StackDetailsContextType = {
	openStackDetails: (stack: StackEnriched) => void;
	closeStackDetails: () => void;
};

export const StackDetailsContext = createContext<StackDetailsContextType>({
	openStackDetails: () => {},
	closeStackDetails: () => {},
});

export function StackDetailsProvider({ children }: { children: ReactNode }) {
	const [activeStack, setActiveStack] = useState<StackEnriched | null>(null);

	const openStackDetails = useCallback((stack: StackEnriched) => {
		setActiveStack(stack);
	}, []);

	const closeStackDetails = useCallback(() => {
		setActiveStack(null);
	}, []);

	const value = useMemo(
		() => ({
			openStackDetails, //
			closeStackDetails,
		}),
		[openStackDetails, closeStackDetails]
	);

	return (
		<StackDetailsContext.Provider value={value}>
			{children}
			{activeStack && <StackDetailsPanel stack={activeStack} onClose={closeStackDetails} />}
		</StackDetailsContext.Provider>
	);
}
