import { css, keyframes } from "emotion";

export function LoadingSpinner() {
	return <div className={styles.spinner} />;
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const styles = {
	spinner: css`
		width: 24px;
		height: 24px;
		border: 3px solid hsl(0, 0%, 90%);
		border-top-color: hsl(250, 90%, 60%);
		border-radius: 50%;
		animation: ${spin} 0.8s linear infinite;
	`,
};
