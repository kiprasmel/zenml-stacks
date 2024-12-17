import { css } from "emotion";

import { Contexts } from "./context/Contexts";
import { StacksList } from "./component/StacksList";

function App() {
	return (
		<Contexts>
			<div className={styles.app}>
				<StacksList />
			</div>
		</Contexts>
	);
}

const styles = {
	app: css`
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
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

export default App;
