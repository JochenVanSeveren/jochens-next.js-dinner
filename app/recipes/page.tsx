import RecipeCard from "./RecipeCard";
// import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";

export default async function Recipes() {
	const recipes: Recipe[] = await prisma.recipe.findMany();

	return (
		<div>
			<h1>Recipes</h1>
			<div>
				{recipes.map((recipe) => {
					return <RecipeCard key={recipe.slug} recipe={recipe} />;
				})}
			</div>
		</div>
	);
}
