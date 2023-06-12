import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static"; // no necessary, just for demonstration

export default function Home() {
	return (
		<main>
			<h1>
				Met mijn darmaandoening (
				<a
					href="https://www.gezondheidenwetenschap.be/richtlijnen/prikkelbaredarmsyndroom-pds"
					target="_blank"
					rel="noopener noreferrer">
					pbs
				</a>
				) krijg ik vaak volgende vragen:
			</h1>
			<Link href={"/cant-eats"}>Wat mag je niet eten?</Link>
			<Link href={"/likes"}>Wat mag je dan wel eten?</Link>
			<Link href={"/recipes"}>Wat maak jij dan zoal?</Link>
		</main>
	);
}
