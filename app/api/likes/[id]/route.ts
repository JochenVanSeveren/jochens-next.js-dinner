import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiRequest } from "next";

export async function PUT(
	request: NextApiRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const data = await request.body;
		const updatedLike = await prisma.like.update({
			where: { id: params.id },
			data,
		});
		return new Response(JSON.stringify(updatedLike), {
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
			message = "Like not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(
	request: NextApiRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const like = await prisma.like.delete({
			where: { id: params.id },
		});
		return new Response(JSON.stringify(like), {
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
			message = "Like not found";
		}

		return new Response(JSON.stringify({ message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}