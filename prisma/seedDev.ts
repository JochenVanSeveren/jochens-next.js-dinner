const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const CREDENTIALS_USER_ID = "clirgjfrk000008mo2j8y52px";

const url = process.env.DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
	throw new Error(
		`Refusing to seed: DATABASE_URL is not a local database (${
			url.split("@")[1] ?? "unset"
		}). This script is dev-only.`
	);
}

const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString: url }),
});

async function main() {
	const email = process.env.REAL_ADMIN_EMAIL ?? "test@localhost";
	const password = process.env.INVITED_USER_SECRET;

	if (!password) {
		throw new Error("Set INVITED_USER_SECRET in .env.local first.");
	}

	const user = await prisma.user.upsert({
		where: { id: CREDENTIALS_USER_ID },
		update: { email, role: "ADMIN" },
		create: {
			id: CREDENTIALS_USER_ID,
			name: "Test User",
			email,
			role: "ADMIN",
		},
	});

	console.log(`Test user ready: ${user.email} (role ${user.role})`);
	console.log(`Sign in at /auth/signin with password: ${password}`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
