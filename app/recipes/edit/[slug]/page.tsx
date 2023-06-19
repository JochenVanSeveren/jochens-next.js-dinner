import { prisma } from "@/lib/prisma";
import RecipeForm from "./RecipeForm";
import { notFound } from "next/navigation";
import { Recipe } from "@prisma/client";

interface Props {
	params: { slug: string };
}

export default async function RecipeFormPage({ params }: Props) {
	const recipe: Recipe | null = await prisma.recipe.findUnique({
		where: { slug: params.slug },
	});

	if (!recipe && params.slug !== "new") {
		notFound();
	}

	return <RecipeForm recipe={recipe} />;
}
