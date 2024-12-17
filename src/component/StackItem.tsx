import { css } from "emotion";

import { StackEnriched } from "../model/stack";
import { StackComponentIcons } from "./StackComponentIcons";

type Props = {
	stack: StackEnriched;
};

export function StackItem({ stack }: Props) {
	return (
		<article className={styles.stackCard}>
			<div className={styles.stackHeader}>
				<h2 title={stack.name}>{stack.name}</h2>
			</div>

			{stack.description && <p className={styles.description}>{stack.description}</p>}

			<div className={styles.meta}>
				<StackComponentIcons components={stack.components} />
				{stack.is_shared && <span className={styles.shared}>Shared</span>}
			</div>
		</article>
	);
}

const styles = {
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
		margin-bottom: 0.75rem;

		h2 {
			font-size: 1.25rem;
			font-weight: 500;
			color: #1a1a1a;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`,
	description: css`
		color: #4a4a4a;
		font-size: 0.875rem;
		margin-bottom: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		max-height: 2.6em;
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
		margin-left: auto;
	`,
};
