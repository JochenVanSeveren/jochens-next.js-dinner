"use server";

import { prisma } from "@/lib/prisma";
const cloudinary = require("cloudinary").v2;
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { cookies, headers } from "next/headers";
import { NextAuthOptions, getServerSession } from "next-auth";
import { RecipeEntrySchema } from "@/lib/validationSchema";
import { redirect } from "next/navigation";
import { log } from "console";
import { revalidatePath } from "next/cache";

export async function handleRecipeSubmit(
	slug: string,
	formdata: FormData,
	imageChanged: boolean,
	ingredients: string[],
	optionalIngredients: string[],
	herbs: string[],
	steps: string[],
	imageSrc: string
) {
	// get author
	const session = await getServerActionSession(authOptions);
	const authorId = session?.user?.id;

	// validate
	const parsed = RecipeEntrySchema.safeParse({
		slug,
		title: formdata.get("title") as string,
		authorId,
		ingredients,
		optionalIngredients,
		herbs,
		steps,
		image: imageSrc,
	});

	if (!parsed.success) {
		return { error: parsed.error.format() };
	}

	// image upload
	let image: string;

	if (imageChanged) {
		try {
			image = await uploadImageToCloudinary(formdata);
		} catch (error: any) {
			error.message = "Error uploading image to cloudinary";
			throw error;
		}
	} else {
		image = imageSrc;
	}

	// recipe upsert
	await prisma.recipe.upsert({
		where: { slug }, // provide the unique identifier
		create: {
			title: formdata.get("title") as string,
			slug: formdata.get("slug") as string,
			image,
			ingredients,
			optionalIngredients,
			herbs,
			steps,
			author: {
				connect: {
					id: authorId,
				},
			},
		},
		update: {
			title: formdata.get("title") as string,
			slug: formdata.get("slug") as string,
			image,
			ingredients,
			optionalIngredients,
			herbs,
			steps,
		},
	});

	revalidatePath(`/recipes/${slug}`);
	redirect(`/recipes/${slug}`);
}

async function uploadImageToCloudinary(formdata: FormData) {
	const timestamp = Date.now() / 1000;

	const paramsToSign = {
		timestamp,
		folder: "jochens-next-dinner/recipes",
	};

	if (!process.env.CLOUDINARY_API_SECRET) {
		throw new Error("CLOUDINARY_API_SECRET is not set");
	}
	const signature = cloudinary.utils.api_sign_request(
		paramsToSign,
		process.env.CLOUDINARY_API_SECRET
	);

	if (!process.env.CLOUDINARY_API_KEY) {
		throw new Error("CLOUDINARY_API_KEY is not set");
	}
	formdata.append("api_key", process.env.CLOUDINARY_API_KEY);
	formdata.append("signature", signature);
	formdata.append("timestamp", timestamp.toString());
	formdata.append("folder", "jochens-next-dinner/recipes");

	const data = await fetch(
		"https://api.cloudinary.com/v1_1/dufz34j2z/image/upload",
		{
			method: "POST",
			body: formdata,
		}
	).then((res) => res.json());

	return data.public_id;
}

export const getServerActionSession = (authConfig: NextAuthOptions) => {
	const req = {
		headers: Object.fromEntries(headers()),
		cookies: Object.fromEntries(
			cookies()
				.getAll()
				.map((c) => [c.name, c.value])
		),
	} as any;
	const res = {
		getHeader() {
			/* empty */
		},
		setCookie() {
			/* empty */
		},
		setHeader() {
			/* empty */
		},
	} as any;
	return getServerSession(req, res, authConfig); // authConfig is your [...nextAuth] route config
};

export async function handleRecipeDelete(id: string, image: string | null) {
	if (!id) {
		throw new Error("No recipe id provided");
	}

	if (image) {
		cloudinary.uploader.destroy(image, function (error: any, result: any) {
			console.log(result, error);
		});
	}

	await prisma.recipe.delete({
		where: {
			id,
		},
	});
	// .then(() => {
	// 	log("Recipe deleted");
	// 	// not working
	// 	revalidatePath(`/recipes/`);
	// 	redirect(`/recipes/`);
	// });
}
