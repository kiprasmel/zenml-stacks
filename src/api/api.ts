export const API = "https://zenml-frontend-challenge-backend.fly.dev";

export async function fetchStacks() {
	const res = await fetch(`${API}/stacks`);
	if (!res.ok) throw new Error("Failed to fetch stacks");
	return res.json();
}

export async function fetchStackComponents() {
	const res = await fetch(`${API}/components`);
	if (!res.ok) throw new Error("Failed to fetch components");
	return res.json();
}
