import AuthCheck from "@/components/auth/AuthCheck";
import RecipeCard from "./RecipeCard";
// import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";

export default async function Recipes() {
	const recipes: Recipe[] = await prisma.recipe.findMany();

	return (
		<div>
			<h1>Recipes</h1>
			<AuthCheck permittedRoles={["ADMIN"]}>
				<Link href={"/recipes/edit/new"}>NEW</Link>
			</AuthCheck>
			<div>
				{recipes.map((recipe) => {
					return <RecipeCard key={recipe.slug} recipe={recipe} />;
				})}
			</div>
		</div>
	);
}
