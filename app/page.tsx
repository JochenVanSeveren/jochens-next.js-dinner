import Image from "next/image";

export const dynamic = "force-static"; // no necessary, just for demonstration

export default function Home() {
	return (
		<main>
			<div>Op deze website kan je de recepten van Jochen vinden</div>
			<div>
				De ingredienten die hij niet kan eten door{" "}
				<a href="https://www.gezondheidenwetenschap.be/richtlijnen/prikkelbaredarmsyndroom-pds">
					pbs
				</a>
			</div>{" "}
			<div>En wat hij in de plaats wel kan eten</div>
		</main>
	);
}
