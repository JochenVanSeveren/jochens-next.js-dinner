import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@prisma/client";

interface Props {
	recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
	const { title, image, slug } = recipe;
	return (
		<div>
			<h1>{title}</h1>
			<Link href={`/recipes/${slug}`}>
				<Image
					src={image ?? ""}
					alt={title}
					width={500} // specify your desired width
					height={300} // and height
				/>
			</Link>
		</div>
	);
}
