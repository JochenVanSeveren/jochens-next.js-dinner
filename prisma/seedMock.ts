const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const recipes = require("./seed/recipes.json");

async function main() {
	console.log(`Deleting data ...`);
	await prisma.recipe.deleteMany();

	console.log(`Data deleted.`);

	console.log(`Starting to seed...`);

	for (const recipe of recipes) {
		await prisma.recipe.create({ data: recipe });
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
