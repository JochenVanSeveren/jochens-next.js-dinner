import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET() {
	try {
		const cantEats = await prisma.cantEat.findMany();
		return new Response(JSON.stringify(cantEats), {
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

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		// Validate data
		if (!data.name || !data.authorId) {
			return new Response(JSON.stringify({ message: "Invalid data" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const newCantEat = await prisma.cantEat.create({ data });
		return new Response(JSON.stringify(newCantEat), {
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
