import { css } from "emotion";
import { useQuery } from "@tanstack/react-query";

import "./reset.css";

import type { StackComponent } from "./data/stack-components";

function App() {
	const { enrichedStacks } = useEnrichedStacks();

	return (
		<div className={styles.app}>
			<h1>Stacks</h1>

			<div>
				<ul className={styles.stackList}>
					{enrichedStacks.map((stack) => (
						<li key={stack.id}>
							<h2>{stack.name}</h2>
							<div>
								<ul>
									{stack.components.map((c) => (
										<li key={stack.id + ":" + c.id}>{c.type}</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

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
		artifact_store: string[]; // DB (s3-like)
		orchestrator: string[]; // godfather
		container_registry?: string[]; // container(s)
		data_validator?: string[]; // inspector/zoom lense
		experiment_tracker?: string[]; // magic wand / wizard cap
		model_deployer?: string[]; // rocket
		secrets_manager?: string[]; // key
	};
};

export type StackEnriched = Omit<Stack, "components"> & {
	components: StackComponent[];
};

const API = "https://zenml-frontend-challenge-backend.fly.dev";

function useFetchStacks() {
	return useQuery({
		queryKey: ["stacks"],
		queryFn: async () => {
			const res = await fetch(`${API}/stacks`);
			if (!res.ok) throw new Error("Failed to fetch stacks");
			return res.json();
		},
		retry: 5,
		retryDelay: (attemptIndex) => 1000 * 2 ** attemptIndex,
	});
}

function useFetchStackComponents() {
	return useQuery({
		queryKey: ["components"],
		queryFn: async () => {
			const res = await fetch(`${API}/components`);
			if (!res.ok) throw new Error("Failed to fetch components");
			return res.json();
		},
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}

function enrichStacksWithComponents(stacks: Stack[], components: StackComponent[]): StackEnriched[] {
	const enriched: StackEnriched[] = [];

	for (const stack of stacks) {
		const stackEnriched: StackEnriched = { ...stack, components: [] };
		enriched.push(stackEnriched);

		for (const [flavor, IDs] of Object.entries(stack.components)) {
			const matchingComponents: StackComponent[] = components.filter(
				(x) => flavor === x.type && IDs.includes(x.id)
			);

			stackEnriched.components.push(...matchingComponents);
		}
	}

	return enriched;
}

function useEnrichedStacks() {
	const { data: stacks = [] } = useFetchStacks();
	const { data: components = [] } = useFetchStackComponents();

	const enrichedStacks: StackEnriched[] = enrichStacksWithComponents(stacks, components);

	return { stacks, components, enrichedStacks };
}

const styles = {
	app: css``,
	stackList: css`
		& > * + * {
			margin-top: 1rem;
		}
	`,
};

export default App;
