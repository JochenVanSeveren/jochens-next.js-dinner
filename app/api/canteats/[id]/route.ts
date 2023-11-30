import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const data = await request.json();

		// Validate data - adjust this according to your data requirements
		if (!data.name) {
			// Assuming 'name' is a required field
			return new Response(
				JSON.stringify({ message: "Invalid data: Name is required" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// Add any other necessary validations as required for your model

		const updatedCantEat = await prisma.cantEat.update({
			where: { id: params.id },
			data,
		});

		return new Response(JSON.stringify(updatedCantEat), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);

		let status = 500;
		let message = "An error occurred";

		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			status = 404;
			message = "CantEat not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const cantEat = await prisma.cantEat.delete({
			where: { id: params.id },
		});
		return new Response(JSON.stringify(cantEat), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		let status = 500;
		let message = "An error occurred";

		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			status = 404;
			message = "CantEat not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}
