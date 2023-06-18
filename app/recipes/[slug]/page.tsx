import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import TestImage from "./TestImage";
import { CldImage } from "next-cloudinary";

interface Props {
	params: { slug: string };
}

export default async function RecipePage({ params }: Props) {
	const recipe: Recipe | null = await prisma.recipe.findUnique({
		where: { slug: params.slug },
	});

	if (!recipe) {
		notFound();
	}

	const { title, ingredients, optionalIngredients, herbs, image, steps } =
		recipe ?? {};

	return (
		<div>
			<h1>Recipe: {title}</h1>
			<TestImage image={image ?? ""} title={title} />
			<h2>Ingredients</h2>
			<ul>
				{ingredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<h2>Optional Ingredients</h2>
			<ul>
				{optionalIngredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<h2>Herbs</h2>
			<ul>
				{herbs.map((herb) => (
					<li key={herb}>{herb}</li>
				))}
			</ul>
			<h2>Steps</h2>
			<ol>
				{steps.map((step) => (
					<li key={step}>{step}</li>
				))}
			</ol>{" "}
			<button>
				{" "}
				<Link href={`/recipes/edit/${recipe.slug}`}>Edit</Link>
			</button>
		</div>
	);
}
