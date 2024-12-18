import { css } from "emotion";

import { StackComponent, countComponentsByType, COMPONENT_ICONS } from "../model/stack";

export type StackComponentIconListProps = {
	components: StackComponent[];
};

export function StackComponentIconList({ components }: StackComponentIconListProps) {
	const componentCounts = countComponentsByType(components);

	return (
		<div className={styles.icons}>
			{Object.keys(COMPONENT_ICONS).map((type) => {
				const count = componentCounts[type as StackComponent["type"]] || 0;
				const isActive = count > 0;

				return (
					<StackComponentIcon
						key={type}
						type={type as StackComponent["type"]}
						count={count}
						isActive={isActive}
					/>
				);
			})}
		</div>
	);
}

export type StackComponentIconProps = {
	type: StackComponent["type"];
	count: number;
	isActive: boolean;
};

export function StackComponentIcon({ type, count, isActive }: StackComponentIconProps) {
	const { Icon, color: _color, title } = COMPONENT_ICONS[type];
	const color = isActive ? _color : "hsl(0, 0%, 62%)";

	return (
		<div key={type} className={styles.iconWrapper} title={title}>
			<Icon size={16} className={styles.icon} color={color} />
			{count > 1 && (
				<span className={styles.count} style={{ color }}>
					{count}
				</span>
			)}
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
