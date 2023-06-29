import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
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
