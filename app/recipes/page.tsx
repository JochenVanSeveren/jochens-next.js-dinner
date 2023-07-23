import AuthCheck from "@/components/auth/AuthCheck";
import RecipeCard from "./RecipeCard";
// import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";

export default async function Recipes() {
	const recipes: Recipe[] = await prisma.recipe.findMany();

	return (
		<div className="mb-4">
			<AuthCheck permittedRoles={["ADMIN"]}>
				<Link href={"/recipes/edit/new"} className="absolute right-4 text-sm">
					<button>+</button>
				</Link>
			</AuthCheck>
			<h1>Recipes</h1>

			<div>
				{recipes.map((recipe) => {
					return <RecipeCard key={recipe.slug} recipe={recipe} />;
				})}
			</div>
		</div>
	);
}
