"use server";

import { prisma } from "@/lib/prisma";
const cloudinary = require("cloudinary").v2;

export async function handleRecipeSubmit(formdata: FormData) {
	const timestamp = Date.now() / 1000;

	const paramsToSign = {
		timestamp,
		folder: "jochens-next-dinner/recipes",
	};

	const signature = cloudinary.utils.api_sign_request(
		paramsToSign,
		process.env.CLOUDINARY_API_SECRET
	);

	console.log("signature", signature);

	// @ts-ignore
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

	console.log(data.public_id);
	console.log("handleRecipeSubmit server side!");
}
