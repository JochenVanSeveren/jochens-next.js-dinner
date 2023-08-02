import AuthCheck from "@/components/auth/AuthCheck";
import RecipeCard from "./RecipeCard";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import BreadCrumbs from "@/components/elements/BreadCrumbs";

export default async function Recipes() {
	const recipes: Recipe[] = await prisma.recipe.findMany();

	return (
		<div className="mb-4">
			<BreadCrumbs
				items={[{ label: "Recipes", path: "/recipes" }]}></BreadCrumbs>
			<AuthCheck permittedRoles={["ADMIN"]}>
				<Link href="/recipes/edit/new" className="absolute right-4 text-sm">
					<button>+</button>
				</Link>
			</AuthCheck>
			<h1>Recipes</h1>

			<div className="flex flex-wrap gap-4 sm:space-x-4 justify-evenly">
				{" "}
				{recipes.map((recipe) => {
					return <RecipeCard key={recipe.slug} recipe={recipe} />;
				})}
			</div>
		</div>
	);
}
