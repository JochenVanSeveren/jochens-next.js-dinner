"use client";

import { Recipe as RecipeType } from "@prisma/client";
import { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import urlSlug from "url-slug";
import { handleRecipeSubmit } from "@/lib/actions";
import CldImage from "@/components/elements/CldImage";

type RecipeFormProps = {
	recipe: RecipeType | null;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
	const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
	const [imageChanged, setImageChanged] = useState<boolean>(false);

	const {} = recipe ?? {};
	const [title, setTitle] = useState<string>(recipe?.title ?? "");
	const [slug, setSlug] = useState<string>(recipe?.slug ?? "");
	const [imageSrc, setImageSrc] = useState<string>(recipe?.image ?? "");

	const { pending } = useFormStatus();

	useEffect(() => {
		if (title) {
			setSlug(urlSlug(title));
		}
	}, [title]);

	// async function handleSubmit(formData: FormData) {
	// 	"use server";
	// 	// e.preventDefault();

	// 	// const formData = new FormData(e.currentTarget);
	// 	console.log(formData.get("image"));
	// 	// TODO
	// }

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		// check if files are present
		if (!e.target.files) return;

		const file = e.target.files[0];
		const MAX_SIZE = 20000000; // max size in bytes, e.g. 2MB
		const permittedTypes = ["image/jpeg", "image/png"];

		// check if file is an image with a permitted type and within size limit
		if (file && permittedTypes.includes(file.type) && file.size <= MAX_SIZE) {
			setImageSrc(URL.createObjectURL(file));
			setImageChanged(true); // Image has changed
		} else {
			setDialogIsOpen(true);
		}
	}

	return (
		<>
			<h1>RecipeForm</h1>

			<form action={handleRecipeSubmit}>
				<input
					type="hidden"
					name="imageChanged"
					value={imageChanged.toString()}
				/>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<p>Slug: {slug}</p>
				<CldImage
					src={imageSrc || ""}
					alt={"Upload image"}
					width={500} // specify your desired width
					height={300} // and height
				/>
				<input
					type="file"
					name="file"
					accept="image/*"
					onChange={handleChange}
				/>
				<dialog open={dialogIsOpen}>
					Please select an image (JPEG, PNG) smaller than 20MB
					<button onClick={() => setDialogIsOpen(false)}>OK</button>
				</dialog>
				<button type="submit" disabled={pending}>
					Submit
				</button>
			</form>
		</>
	);
}
