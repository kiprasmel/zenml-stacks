import type { StackComponent } from "../data/stack-components";
import { COMPONENT_TYPE_ORDER } from "../component/StackComponentIcons";

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
