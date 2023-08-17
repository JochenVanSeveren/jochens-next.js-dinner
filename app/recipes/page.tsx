import AuthCheck from "@/components/auth/AuthCheck";
import RecipeCard from "./RecipeCard";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import BreadCrumbs from "@/components/elements/BreadCrumbs";

export default async function Recipes() {
	const recipes: Recipe[] = await prisma.recipe.findMany();

	// const recipes: Recipe[] = await new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		resolve(prisma.recipe.findMany());
	// 	}, 10000);
	// });

	const midPoint = Math.ceil(recipes.length / 2);

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

			<div className="grid md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4">
					{recipes.slice(0, midPoint).map((recipe) => (
						<RecipeCard key={recipe.slug} recipe={recipe} />
					))}
				</div>

				<div className="flex flex-col gap-4">
					{recipes.slice(midPoint).map((recipe) => (
						<RecipeCard key={recipe.slug} recipe={recipe} />
					))}
				</div>
			</div>
		</div>
	);
}
