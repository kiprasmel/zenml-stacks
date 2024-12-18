import { Database, Shuffle, Package, Search, Wand2, Rocket, KeyRound, LucideIcon } from "lucide-react";

import type { StackComponent } from "../data/stack-components";

export { StackComponent };

export type Stack = {
	id: string;
	created: string;
	updated: string;
	user: string;
	project: string;
	is_shared: boolean;
	name: string;
	description: string;
	components: {
		artifact_store: string[];
		orchestrator: string[];
		container_registry?: string[];
		data_validator?: string[];
		experiment_tracker?: string[];
		model_deployer?: string[];
		secrets_manager?: string[];
	};
};

export type StackEnriched = Omit<Stack, "components"> & {
	components: StackComponent[];
};

export const COMPONENT_ICONS = {
	artifact_store: { Icon: Database, color: "hsl(207, 90%, 54%)", title: "Artifact Store" },
	orchestrator: { Icon: Shuffle, color: "hsl(122, 39%, 49%)", title: "Orchestrator" },
	container_registry: { Icon: Package, color: "hsl(36, 100%, 50%)", title: "Container Registry" },
	data_validator: { Icon: Search, color: "hsl(291, 64%, 42%)", title: "Data Validator" },
	experiment_tracker: { Icon: Wand2, color: "hsl(340, 82%, 52%)", title: "Experiment Tracker" },
	model_deployer: { Icon: Rocket, color: "hsl(262, 52%, 47%)", title: "Model Deployer" },
	secrets_manager: { Icon: KeyRound, color: "hsl(16, 70%, 38%)", title: "Secrets Manager" },
} as const satisfies Record<StackComponent["type"], { Icon: LucideIcon; color: string; title: string }>;

export const COMPONENT_TYPE_ORDER = Object.keys(COMPONENT_ICONS) as StackComponent["type"][];

export function sortStackComponents(stack: StackEnriched) {
	return [...stack.components].sort((a, b) => {
		const aIndex = COMPONENT_TYPE_ORDER.indexOf(a.type);
		const bIndex = COMPONENT_TYPE_ORDER.indexOf(b.type);
		return aIndex - bIndex;
	});
}

export function countComponentsByType(components: StackComponent[]) {
	return components.reduce(
		(acc, component) => {
			acc[component.type] = (acc[component.type] || 0) + 1;
			return acc;
		},
		{} as Record<StackComponent["type"], number>
	);
}

export function searchStacks(enrichedStacks: StackEnriched[], searchQuery: string) {
	return enrichedStacks.filter((stack) => {
		if (!searchQuery.trim()) return true;

		const query = searchQuery.toLowerCase();
		return (
			stack.name.toLowerCase().includes(query) ||
			stack.description?.toLowerCase().includes(query) ||
			stack.components.some(
				(component) =>
					component.name.toLowerCase().includes(query) ||
					component.type.toLowerCase().includes(query) ||
					component.flavor.toLowerCase().includes(query)
			)
		);
	});
}
