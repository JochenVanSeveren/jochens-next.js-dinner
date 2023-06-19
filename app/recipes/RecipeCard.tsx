import Link from "next/link";
import { Recipe } from "@prisma/client";
import CldImage from "@/components/elements/CldImage";

interface Props {
	recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
	const { title, image, slug } = recipe;
	return (
		<div>
			<h1>{title}</h1>
			<Link href={`/recipes/${slug}`}>
				<CldImage
					src={image ?? ""}
					alt={title}
					width={500} // specify your desired width
					height={300} // and height
				/>
			</Link>
		</div>
	);
}
