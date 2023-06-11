import { prisma } from "@/lib/prisma";
import Image from "next/image";

// export const revalidate = 60 * 60 * 24; // 1 day

interface Recipe {
	title: string;
	ingredients: string[];
	herbs: string[];
	image: string | null;
	steps: string[];
	id: string;
}

interface Props {
	params: { id: string };
}

// export async function generateStaticParams({ params }: Props) {
// 	const recipe = await prisma.recipe.findUnique({ where: { id: params.id } });
// 	return recipe;
// }

export default async function RecipePage({ params }: Props) {
	const recipe: Recipe | null = await prisma.recipe.findUnique({
		where: { id: params.id },
	});

	if (!recipe) {
		return <div>No Recipe Found</div>;
	}

	const { title, ingredients, herbs, image, steps } = recipe ?? {};

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
			</ol>
		</div>
	);
}
