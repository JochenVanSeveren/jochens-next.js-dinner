import { prisma } from "@/lib/prisma";

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

export async function POST(request: { json: () => Promise<any> }) {
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
