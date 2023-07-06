const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const recipes = require("./seed/recipes.json");
const cantEats = require("./seed/cantEats.json");
const likes = require("./seed/likes.json");

async function main() {
	console.log(`Deleting data ...`);
	await prisma.recipe.deleteMany();
	await prisma.cantEat.deleteMany();
	await prisma.like.deleteMany();

	console.log(`Data deleted.`);

	console.log(`Starting to seed...`);

	for (const recipe of recipes) {
		await prisma.recipe.create({ data: recipe });
	}

	for (const cantEat of cantEats) {
		await prisma.cantEat.create({ data: cantEat });
	}

	for (const like of likes) {
		await prisma.like.create({ data: like });
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
