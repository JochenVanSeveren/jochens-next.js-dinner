import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET() {
	try {
		const likes = await prisma.like.findMany();
		return NextResponse.json(likes);
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
		if (!data.name || !data.category || !data.authorId) {
			// Assuming 'authorId' is the field to connect with User
			return new Response(JSON.stringify({ message: "Invalid data" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const newLike = await prisma.like.create({
			data: {
				...data,
				// author: { connect: { id: data.authorId } }, // Connecting the Like with an existing User
			},
		});

		return new Response(JSON.stringify(newLike), {
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
