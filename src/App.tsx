import { css } from "emotion";
import { useQuery } from "@tanstack/react-query";

import "./reset.css";

import type { StackComponent } from "./data/stack-components";

function App() {
	const { enrichedStacks } = useEnrichedStacks();

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>Stacks</h1>
				<p>{enrichedStacks.length} stacks found</p>
			</header>

			<div className={styles.stackGrid}>
				{enrichedStacks.map((stack) => (
					<article key={stack.id} className={styles.stackCard}>
						<div className={styles.stackHeader}>
							<h2>{stack.name}</h2>
						</div>

						{stack.description && <p className={styles.description}>{stack.description}</p>}

						<div className={styles.meta}>
							<span>{stack.components.length} components</span>
							{stack.is_shared && <span className={styles.shared}>Shared</span>}
						</div>
					</article>
				))}
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
	app: css`
		max-width: 80vw;
		margin: 0 auto;
		padding: 2rem;
	`,
	header: css`
		margin-bottom: 2rem;

		h1 {
			font-size: 2rem;
			font-weight: 600;
			color: #1a1a1a;
		}

		p {
			color: #666;
			margin-top: 0.5rem;
		}
	`,
	stackGrid: css`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 1.5rem;
	`,
	stackCard: css`
		background: white;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
	`,
	stackHeader: css`
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.75rem;

		h2 {
			font-size: 1.25rem;
			font-weight: 500;
			color: #1a1a1a;
		}
	`,
	description: css`
		color: #4a4a4a;
		font-size: 0.875rem;
		margin-bottom: 1rem;
		display: block;
		line-clamp: 2;
		box-orient: vertical;
		overflow: hidden;
	`,
	meta: css`
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		color: #666;
	`,
	shared: css`
		background: #e5f6fd;
		color: #0288d1;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	`,
};

export default App;
