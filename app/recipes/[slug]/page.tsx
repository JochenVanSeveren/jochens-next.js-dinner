import Image from "next/image";

export const revalidate = 60 * 60 * 24; // 1 day

interface Recipe {
	name: string;
	ingredients: string[];
	herbs: string[];
	img: string;
	steps: string[];
	slug: string;
}

interface Props {
	params: { slug: string };
}

export async function generateStaticParams() {
	const recipes: Recipe[] = await fetch(
		"http://localhost:3000/api/content"
	).then((res) => res.json());

	return recipes.map((recipe) => ({
		slug: recipe.slug,
	}));
}

export default async function RecipePage({ params }: Props) {
	const recipes: Recipe[] = await fetch("http://localhost:3000/api/content", {
		cache: "force-cache",
	}).then((res) => res.json());

	const recipe = recipes.find((recipe) => recipe.slug === params.slug)!;

	return (
		<div>
			<h1>Recipe: {recipe.name}</h1>
			{/* <Image
				src={recipe.img}
				alt="Picture of the meal"
				width={500}
				height={500}
			/> */}
			<h2>Ingredients</h2>
			<ul>
				{recipe.ingredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<h2>Herbs</h2>
			<ul>
				{recipe.herbs.map((herb) => (
					<li key={herb}>{herb}</li>
				))}
			</ul>
			<h2>Steps</h2>
			<ol>
				{recipe.steps.map((step) => (
					<li key={step}>{step}</li>
				))}
			</ol>
		</div>
	);
}
