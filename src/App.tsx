import { useState, useEffect } from "react";
import { css } from "emotion";

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

/**
 * TODO retry logic
 */
function useFetchStacks() {
	const [stacks, setStacks] = useState<Stack[]>([]);

	useEffect(() => {
		fetch(`${API}/stacks`)
			.then((res) => {
				if (!res.ok) {
					console.error("failed fetching stacks, !res.ok", res);
					return [];
				}
				return res.json();
			})
			.then(setStacks)
			.catch((err) => {
				console.error("failed fetching stacks", err);
				setStacks([]);
			});
	}, []);

	return [stacks];
}

function useFetchStackComponents() {
	const [components, setComponents] = useState<StackComponent[]>([]);

	useEffect(() => {
		fetch(`${API}/components`)
			.then((res) => {
				if (!res.ok) {
					console.error("failed fetching components, !res.ok", res);
					return [];
				}
				return res.json();
			})
			.then(setComponents)
			.catch((err) => {
				console.error("failed fetching components", err);
				setComponents([]);
			});
	}, []);

	return [components];
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
	const [stacks] = useFetchStacks();
	const [components] = useFetchStackComponents();

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
