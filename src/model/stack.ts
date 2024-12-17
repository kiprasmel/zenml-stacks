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
