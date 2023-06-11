import RecipeCard from "./RecipeCard";
// import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import AuthCheck from "@/components/AuthCheck";

export default async function Recipes() {
	const recipes = await prisma.recipe.findMany();

	return (
		<AuthCheck>
			<div>
				<h1>Recipes</h1>
				<div>
					{recipes.map((recipe) => {
						return <RecipeCard key={recipe.id} recipe={recipe} />;
					})}
				</div>
			</div>
		</AuthCheck>
	);
}
