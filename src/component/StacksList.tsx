import { useState } from "react";
import { css } from "emotion";

import { useEnrichedStacks } from "../hook/useStacks";
import { LoadingSpinner } from "./LoadingSpinner";
import { StackItem } from "./StackItem";
import { SearchInput } from "./SearchInput";

export function StacksList() {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		filteredEnrichedStacks, //
		isLoading,
		totalComponentsInStacksCount,
		totalComponentsInStacksCountUnique,
	} = useEnrichedStacks(searchQuery);

	return (
		<>
			<header className={styles.header}>
				<h1>Stacks</h1>
				{isLoading ? (
					<p>&nbsp;</p>
				) : (
					<div>
						<p>
							<span>{filteredEnrichedStacks.length} stacks with </span>
							<span>{totalComponentsInStacksCount} components </span>
							<span>({totalComponentsInStacksCountUnique} unique)</span>
						</p>

						<div className={styles.search}>
							<SearchInput
								value={searchQuery}
								onChange={setSearchQuery}
								placeholder="Search stacks by name, description, or components..."
							/>
						</div>
					</div>
				)}
			</header>

			{isLoading ? (
				<div className={styles.loading}>
					<LoadingSpinner />
					<p>Loading stacks...</p>
				</div>
			) : (
				<div className={styles.stackGrid}>
					{filteredEnrichedStacks.map((stack) => (
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
	search: css`
		margin-top: 1.5rem;
	`,
};
