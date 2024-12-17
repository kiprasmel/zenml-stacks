import { css } from "emotion";
import { Database, Shuffle, Package, Search, Wand2, Rocket, KeyRound, LucideIcon } from "lucide-react";

import { StackComponent } from "../model/stack";

const COMPONENT_ICONS = {
	artifact_store: { Icon: Database, color: "hsl(207, 90%, 54%)", title: "Artifact Store" },
	orchestrator: { Icon: Shuffle, color: "hsl(122, 39%, 49%)", title: "Orchestrator" },
	container_registry: { Icon: Package, color: "hsl(36, 100%, 50%)", title: "Container Registry" },
	data_validator: { Icon: Search, color: "hsl(291, 64%, 42%)", title: "Data Validator" },
	experiment_tracker: { Icon: Wand2, color: "hsl(340, 82%, 52%)", title: "Experiment Tracker" },
	model_deployer: { Icon: Rocket, color: "hsl(262, 52%, 47%)", title: "Model Deployer" },
	secrets_manager: { Icon: KeyRound, color: "hsl(16, 70%, 38%)", title: "Secrets Manager" },
} as const satisfies Record<StackComponent["type"], { Icon: LucideIcon; color: string; title: string }>;

type Props = {
	components: StackComponent[];
};

export function StackComponentIcons({ components }: Props) {
	const componentCounts = countComponentsByType(components);

	return (
		<div className={styles.icons}>
			{Object.entries(COMPONENT_ICONS).map(([type, { Icon, color, title }]) => {
				const count = componentCounts[type as StackComponent["type"]] || 0;
				const isActive = count > 0;

				const colorResolved = isActive ? color : "hsl(0, 0%, 62%)";

				return (
					<div key={type} className={styles.iconWrapper} title={title}>
						<Icon size={16} className={styles.icon} color={colorResolved} />
						{count > 1 && (
							<span className={styles.count} style={{ color: colorResolved }}>
								{count}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
}

const styles = {
	icons: css`
		display: flex;
		gap: 0.5rem;
		align-items: center;
	`,
	iconWrapper: css`
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	`,
	icon: css`
		transition: all 0.2s ease;
	`,
	count: css`
		position: absolute;
		top: -4px;
		right: -6px;
		font-size: 0.7rem;
		font-weight: 500;
	`,
};

function countComponentsByType(components: StackComponent[]) {
	return components.reduce(
		(acc, component) => {
			acc[component.type] = (acc[component.type] || 0) + 1;
			return acc;
		},
		{} as Record<StackComponent["type"], number>
	);
}
