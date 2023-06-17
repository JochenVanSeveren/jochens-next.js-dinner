import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Recipe } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
	params: { slug: string };
}

export default async function RecipePage({ params }: Props) {
	const recipe: Recipe | null = await prisma.recipe.findUnique({
		where: { slug: params.slug },
	});

	if (!recipe) {
		return <div>No Recipe Found</div>;
	}

	const { title, ingredients, optionalIngredients, herbs, image, steps } =
		recipe ?? {};

	return (
		<div>
			<h1>Recipe: {title}</h1>
			<Image
				src={image || ""}
				alt={title}
				width={500} // specify your desired width
				height={300} // and height
			/>
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
				<Link href={`/recipes/edit/${recipe.slug}`}>TEST</Link>
			</button>
		</div>
	);
}