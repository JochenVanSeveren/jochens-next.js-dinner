import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

if (!process.env.DATABASE_URL) {
	throw new Error("Please provide process.env.DATABASE_URL");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
		log: [
			{
				emit: "event",
				level: "query",
			},
			{
				emit: "stdout",
				level: "info",
			},
			{
				emit: "stdout",
				level: "warn",
			},
			{
				emit: "stdout",
				level: "error",
			},
		],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
