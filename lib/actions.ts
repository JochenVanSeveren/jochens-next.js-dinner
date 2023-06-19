"use server";

import { prisma } from "@/lib/prisma";

export async function handleRecipeSubmit(formdata: FormData) {
	formdata.get("title");
	formdata.get("slug");
	// prisma.recipe.create({
	// 	data: {
	// 		title: formdata.get("title"),
	// 		slug: formdata.get("slug"),
	// 	},
	// });
	console.log("handleRecipeSubmit server side!");
}
