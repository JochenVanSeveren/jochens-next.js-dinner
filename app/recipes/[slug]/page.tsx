import { prisma } from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import CldImage from "@/components/elements/CldImage";
import AuthCheck from "@/components/auth/AuthCheck";

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
		<div className="space-y-8">
			<h1 className="text-3xl mb-5 text-buff font-bold">{title}</h1>
			<CldImage
				src={image ?? ""}
				alt={title}
				width={600}
				height={600}
				// sizes="(max-width: 480px) 100vw, 50vw"
				className="rounded-lg object-cover neumo ml-auto mr-auto"
			/>
			<div className="space-y-5">
				<div>
					<h2 className="text-2xl font-semibold space-x-1">Ingredients</h2>
					<div className="flex flex-wrap">
						{ingredients.map((ingredient) => (
							<div key={ingredient} className="bg-buff p-2 rounded shadow-md">
								{ingredient}
							</div>
						))}
					</div>
				</div>
				{optionalIngredients.length > 0 && (
					<div>
						<h2 className="text-2xl font-semibold space-x-1">
							Optional Ingredients
						</h2>
						<div className="flex flex-wrap">
							{optionalIngredients.map((ingredient) => (
								<div key={ingredient} className="bg-buff p-2 rounded shadow-md">
									{ingredient}
								</div>
							))}
						</div>
					</div>
				)}
				<div>
					<h2 className="text-2xl font-semibold space-x-1">Herbs</h2>
					<div className="flex flex-wrap">
						{herbs.map((herb) => (
							<div key={herb} className="bg-buff p-2 rounded shadow-md">
								{herb}
							</div>
						))}
					</div>
				</div>
			</div>
			<h2 className="text-2xl font-semibold">Steps</h2>
			<ol className="list-decimal pl-5 space-y-2">
				{steps.map((step) => (
					<li key={step} className="text-lg">
						{step}
					</li>
				))}
			</ol>
			<AuthCheck permittedRoles={["ADMIN"]}>
				<button>
					<Link href={`/recipes/edit/${recipe.slug}`}>Edit</Link>
				</button>
			</AuthCheck>
		</div>
	);
}
