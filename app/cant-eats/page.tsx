import AuthCheck from "@/components/auth/AuthCheck";
import { prisma } from "@/lib/prisma";
import { CantEat } from "@prisma/client";
import CantEatCard from "./CantEatCard";
import CantEatForm from "./CantEatForm";
import BreadCrumbs from "@/components/elements/BreadCrumbs";
import TransitionEffect from "@/components/elements/TransitionEffect";

export default async function CantEats() {
	const cantEats: CantEat[] = await prisma.cantEat.findMany();

	return (
		<div>
			<TransitionEffect />
			<BreadCrumbs
				items={[{ label: "Cant-eats", path: "/cant-eats" }]}></BreadCrumbs>
			<h1>Cant-eats</h1>
			<div className="max-w-xl mr-auto ml-auto">
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
