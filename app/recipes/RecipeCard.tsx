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
			<Link href={`/recipes/${slug}`}>
				<h3 className="text-center">{title}</h3>
				{image && (
					<CldImage
						src={image}
						alt={title}
						width={500} // specify your desired width
						height={300} // and height
						className="rounded-lg mb-2"
					/>
				)}
			</Link>
		</div>
	);
}
