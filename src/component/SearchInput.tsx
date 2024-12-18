import { css } from "emotion";
import { Search } from "lucide-react";

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Search..." }: Props) {
	return (
		<div className={styles.container}>
			<Search size={16} className={styles.icon} />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className={styles.input}
			/>
		</div>
	);
}

const styles = {
	container: css`
		position: relative;
		width: 100%;
	`,
	icon: css`
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: #666;
		pointer-events: none;
	`,
	input: css`
		width: 100%;
		padding: 0.75rem;
		padding-left: 2.5rem;
		border: 1px solid hsl(0, 0%, 90%);
		border-radius: 6px;
		font-size: 0.875rem;

		&::placeholder {
			color: #666;
		}

		&:focus {
			outline: none;
			border-color: hsl(207, 90%, 54%);
		}
	`,
};
