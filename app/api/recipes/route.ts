import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET() {
	try {
		const recipes = await prisma.recipe.findMany();
		return NextResponse.json(recipes);
	} catch (error) {
		// Log the error for debugging purposes
		console.error(error);

		// Return a generic server error response
		return new Response(JSON.stringify({ message: "An error occurred" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		// Validate data
		if (
			!data.slug ||
			!data.title ||
			!data.ingredients ||
			!data.optionalIngredients ||
			!data.herbs ||
			!data.steps ||
			!data.image ||
			!data.authorId
		) {
			return new Response(JSON.stringify({ message: "Invalid data" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const newRecipe = await prisma.recipe.create({
			data: {
				...data,
			},
		});

		return new Response(JSON.stringify(newRecipe), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);

		return new Response(JSON.stringify({ message: "An error occurred" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
