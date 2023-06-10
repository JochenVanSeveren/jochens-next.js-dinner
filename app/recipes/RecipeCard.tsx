import Link from "next/link";
import Image from "next/image";

interface Recipe {
	id: string;
	title: string;
	image: string | null;
}

interface Props {
	recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
	const { id, title, image } = recipe;
	return (
		<div>
			<h1>{title}</h1>
			<Link href={`/recipes/${id}`}>
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
