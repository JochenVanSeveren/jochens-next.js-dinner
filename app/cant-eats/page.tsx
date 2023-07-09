import AuthCheck from "@/components/auth/AuthCheck";
import { prisma } from "@/lib/prisma";
import { CantEat } from "@prisma/client";
import CantEatCard from "./CantEatCard";
import CantEatForm from "./CantEatForm";

export default async function CantEats() {
	const cantEats: CantEat[] = await prisma.cantEat.findMany();

	return (
		<div>
			<h1>Cant-eats</h1>
			<div>
				{cantEats.map((cantEat) => (
					<CantEatCard key={cantEat.id} cantEat={cantEat}></CantEatCard>
				))}
			</div>

			<AuthCheck permittedRoles={["ADMIN"]}>
				<CantEatForm cantEat={null}></CantEatForm>{" "}
			</AuthCheck>
		</div>
	);
}
