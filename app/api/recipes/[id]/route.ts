import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
		const { id, ...data } = await request.json();
		const updatedRecipe = await prisma.recipe.update({
			where: { id: params.id },
			data,
		});
		return new Response(JSON.stringify(updatedRecipe), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		let status = 500;
		let message = "An error occurred";

		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			status = 404;
			message = "Recipe not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
		const recipe = await prisma.recipe.delete({
			where: { id: params.id },
		});
		return new Response(JSON.stringify(recipe), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		let status = 500;
		let message = "An error occurred";

		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			status = 404;
			message = "Recipe not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}
