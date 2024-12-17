import { css } from "emotion";

import { useEnrichedStacks } from "../hook/useStacks";
import { LoadingSpinner } from "./LoadingSpinner";
import { StackItem } from "./StackItem";

export function StacksList() {
	const {
		enrichedStacks, //
		isLoading,
		totalComponentsInStacksCount,
		totalComponentsInStacksCountUnique,
	} = useEnrichedStacks();

	return (
		<>
			<header className={styles.header}>
				<h1>Stacks</h1>
				{isLoading ? (
					<p>&nbsp;</p>
				) : (
					<p>
						<span>{enrichedStacks.length} stacks with </span>
						<span>{totalComponentsInStacksCount} components </span>
						<span>({totalComponentsInStacksCountUnique} unique)</span>
					</p>
				)}
			</header>

			{isLoading ? (
				<div className={styles.loading}>
					<LoadingSpinner />
					<p>Loading stacks...</p>
				</div>
			) : (
				<div className={styles.stackGrid}>
					{enrichedStacks.map((stack) => (
						<StackItem key={stack.id} stack={stack} />
					))}
				</div>
			)}
		</>
	);
}

const styles = {
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
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	`,
	loading: css`
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;

		p {
			color: hsl(0, 0%, 45%);
			font-size: 0.875rem;
		}
	`,
};
