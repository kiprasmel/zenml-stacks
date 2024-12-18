import { css } from "emotion";
import { X } from "lucide-react";

import { COMPONENT_TYPE_ORDER, StackEnriched, sortStackComponents } from "../model/stack";
import { StackComponentIcon } from "./StackComponentIcons";

type Props = {
	stack: StackEnriched;
	onClose: () => void;
};

export function StackDetailsPanel({ stack, onClose }: Props) {
	const sortedComponents = sortStackComponents(stack);

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.panel} onClick={(e) => e.stopPropagation()}>
				<header className={styles.header}>
					<div>
						<h2>{stack.name}</h2>
						<p className={styles.id}>ID: {stack.id}</p>
					</div>
					<button type="button" onClick={onClose} className={styles.closeButton}>
						<X size={20} />
					</button>
				</header>

				<div className={styles.content}>
					{/* Basic Info */}
					<section className={styles.section}>
						<h3>Basics</h3>
						<dl className={styles.details}>
							<dt>Created</dt>
							<dd>{new Date(stack.created).toLocaleString()}</dd>

							<dt>Last Updated</dt>
							<dd>{new Date(stack.updated).toLocaleString()}</dd>

							<dt>Project ID</dt>
							<dd>{stack.project}</dd>

							<dt>User ID</dt>
							<dd>{stack.user}</dd>

							<dt>Sharing</dt>
							<dd>{stack.is_shared ? "Shared" : "Private"}</dd>
						</dl>
					</section>

					{/* Description */}
					{stack.description && (
						<section className={styles.section}>
							<h3>Description</h3>
							<p className={styles.description}>{stack.description}</p>
						</section>
					)}

					{/* Components */}
					<section className={styles.section}>
						<h3>
							Components ({sortedComponents.length}/{COMPONENT_TYPE_ORDER.length})
						</h3>
						<div className={styles.componentsList}>
							{sortedComponents.map((component) => (
								<div key={component.id} className={styles.component}>
									<div className={styles.componentHeader}>
										<h4>{component.name}</h4>
										<StackComponentIcon type={component.type} count={1} isActive />
									</div>
									<dl className={styles.details}>
										<dt>Type</dt>
										<dd>{component.type}</dd>

										<dt>Flavor</dt>
										<dd>{component.flavor}</dd>

										<dt>Configuration</dt>
										<dd className={styles.configurationValue}>
											<pre className={styles.code}>
												{JSON.stringify(component.configuration, null, 4)}
											</pre>
										</dd>
									</dl>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

const styles = {
	overlay: css`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		z-index: 100;
	`,
	panel: css`
		background: white;
		width: min(480px, 100%);
		height: 100%;
		box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	`,
	header: css`
		padding: 1.5rem;
		border-bottom: 1px solid hsl(0, 0%, 93%);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		> div {
			min-width: 0;
			margin-right: 1rem;
		}

		h2 {
			font-size: 1.5rem;
			font-weight: 500;
			color: #1a1a1a;
			margin: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	`,
	id: css`
		font-size: 0.875rem;
		color: #666;
	`,
	closeButton: css`
		background: none;
		border: none;
		padding: 0.5rem;
		margin: -0.5rem;
		cursor: pointer;
		color: #666;
		flex-shrink: 0;

		&:hover {
			color: #1a1a1a;
		}
	`,
	content: css`
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	`,
	section: css`
		& + & {
			margin-top: 2rem;
			padding-top: 2rem;
			border-top: 1px solid hsl(0, 0%, 93%);
		}

		h3 {
			font-size: 1.125rem;
			font-weight: 500;
			color: #1a1a1a;
			margin-bottom: 1rem;
		}
	`,
	details: css`
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 0.5rem 1rem;
		margin-top: 0;

		dt {
			color: #666;
			font-size: 0.875rem;
		}

		dd {
			font-size: 0.875rem;
		}
	`,
	description: css`
		color: #4a4a4a;
		font-size: 0.875rem;
		line-height: 1.5;
	`,
	componentsList: css`
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	`,
	component: css`
		background: hsl(0, 0%, 98%);
		border-radius: 6px;
		padding: 1rem;
	`,
	componentHeader: css`
		display: flex;
		justify-content: space-between;
		align-items: center;

		h4 {
			font-size: 1rem;
			font-weight: 500;
			color: #1a1a1a;
		}
	`,
	code: css`
		font-family: monospace;
		font-size: 0.75rem;
		background: hsl(0, 0%, 90%);
		padding: 0.5rem;
		border-radius: 4px;
		overflow-x: auto;
		white-space: pre;
		max-height: 400px;
		overflow-y: auto;
		margin: 0;
	`,
	configurationValue: css`
		/* take up full width */
		grid-column: 1 / -1;
		margin: 0;
	`,
};
