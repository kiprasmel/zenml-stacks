import { useQuery } from "@tanstack/react-query";

import { fetchStackComponents, fetchStacks } from "../api/api";
import { Stack, StackComponent, StackEnriched, searchStacks } from "../model/stack";

function useFetchStacks() {
	return useQuery({
		queryKey: ["stacks"],
		queryFn: fetchStacks,
		retry: 5,
		retryDelay: (attemptIndex) => 1000 * 2 ** attemptIndex,
	});
}

function useFetchStackComponents() {
	return useQuery({
		queryKey: ["components"],
		queryFn: fetchStackComponents,
		retry: 5,
		retryDelay: (attemptIndex) => 1000 * 2 ** attemptIndex,
	});
}

function enrichStacksWithComponents(stacks: Stack[], components: StackComponent[]): StackEnriched[] {
	const enriched: StackEnriched[] = [];

	for (const stack of stacks) {
		const stackEnriched: StackEnriched = { ...stack, components: [] };
		enriched.push(stackEnriched);

		for (const [flavor, IDs] of Object.entries(stack.components)) {
			const matchingComponents = components.filter((x) => flavor === x.type && IDs.includes(x.id));

			stackEnriched.components.push(...matchingComponents);
		}
	}

	return enriched;
}

export function useEnrichedStacks(searchQuery: string) {
	const { data: stacks = [], isLoading: isLoadingStacks } = useFetchStacks();
	const { data: components = [], isLoading: isLoadingComponents } = useFetchStackComponents();
	const isLoading = isLoadingStacks || isLoadingComponents;

	const enrichedStacks = enrichStacksWithComponents(stacks, components);
	const filteredEnrichedStacks = searchStacks(enrichedStacks, searchQuery);

	const totalComponentsInStacksCount = filteredEnrichedStacks.reduce(
		(acc, stack) => acc + stack.components.length,
		0
	);
	const totalComponentsInStacksCountUnique = new Set(
		filteredEnrichedStacks.flatMap((stack) => stack.components.map((x) => x.id))
	).size;

	return {
		stacks, //
		components,
		enrichedStacks,
		filteredEnrichedStacks,
		isLoading,
		totalComponentsInStacksCount,
		totalComponentsInStacksCountUnique,
	};
}
