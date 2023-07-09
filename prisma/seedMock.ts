const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const recipes = require("./seed/recipes.json");
const cantEats = require("./seed/cantEats.json");
const likes = require("./seed/likes.json");
const users = require("./seed/users.json");

async function main() {
	console.log(`Deleting data ...`);
	await prisma.recipe.deleteMany();
	await prisma.cantEat.deleteMany();
	await prisma.like.deleteMany();

	console.log(`Data deleted.`);

	console.log(`Starting to seed...`);

	const author = await prisma.user.findUnique({
		where: {
			email: process.env.REAL_ADMIN_EMAIL,
		},
	});

	if (!author) {
		throw new Error("Author not found");
	}

	const authorId = author.id;

	for (const recipe of recipes) {
		await prisma.recipe.create({
			data: {
				...recipe,
				authorId,
			},
		});
	}

	for (const cantEat of cantEats) {
		await prisma.cantEat.create({
			data: {
				...cantEat,
				authorId,
			},
		});
	}

	for (const like of likes) {
		await prisma.like.create({
			data: {
				...like,
				authorId,
			},
		});
	}

	for (const user of users) {
		if (
			!(await prisma.user.findUnique({
				where: {
					id: user.id,
				},
			}))
		) {
			await prisma.user.create({ data: user });
		}
	}

	console.log(`Seeding finished.`);
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
