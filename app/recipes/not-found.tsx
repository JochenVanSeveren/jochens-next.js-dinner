import Link from "next/link";

export default function RecipeNotFound() {
	return (
		<div>
			<h1>Not Found</h1>
			<p>Could not find Recipe</p>
			<p>
				View <Link href="/recipes">all recipes</Link>
			</p>
		</div>
	);
}
