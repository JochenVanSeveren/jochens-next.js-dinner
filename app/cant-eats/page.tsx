import { prisma } from "@/lib/prisma";
import { CantEat } from "@prisma/client";

export default async function CantEats() {
	const cantEats: CantEat[] = await prisma.cantEat.findMany();

	return (
		<div>
			<h1>Cant-eats</h1>
			<div>
				{cantEats.map((cantEat) => (
					<div key={cantEat.id}>{cantEat.name}</div>
				))}
			</div>
		</div>
	);
}
