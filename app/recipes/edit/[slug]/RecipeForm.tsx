"use client";

import { Recipe as RecipeType } from "@prisma/client";
import { use, useEffect, useState } from "react";
import urlSlug from "url-slug";
import Image from "next/image";

type RecipeFormProps = {
	recipe: RecipeType | null;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
	const {} = recipe ?? {};
	const [title, setTitle] = useState<string>(recipe?.title ?? "");
	const [slug, setSlug] = useState<string>(recipe?.slug ?? "");
	const [image, setImage] = useState<string>(recipe?.image ?? "");

	useEffect(() => {
		if (title) {
			setSlug(urlSlug(title));
		}
	}, [title]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		// TODO
	};

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		// check if file is image

		if (!e.target.files) return;
		setImage(URL.createObjectURL(e.target.files[0]));
	}

	return (
		<>
			<h1>RecipeForm</h1>

			<div>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<p>Slug: {slug}</p>
				<Image
					src={image || ""}
					alt={"Upload image"}
					width={500} // specify your desired width
					height={300} // and height
				/>
				<input
					type="file"
					name="image"
					accept="image/*"
					onChange={handleChange}
				/>
			</div>
		</>
	);
}
