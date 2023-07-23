import Link from "next/link";
import { PiCookingPotBold } from "react-icons/pi";
import { GiPoisonBottle } from "react-icons/gi";
import { BiLike } from "react-icons/bi";
import AuthCheck from "@/components/auth/AuthCheck";
export const dynamic = "force-static"; // not necessary, just for demonstration
import { HiLockClosed } from "react-icons/hi";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h3 className="text-left mb-8 mt-4">
				Met mijn darmaandoening (
				<a
					className="text-buff-400 underline hover:text-buff-500"
					href="https://www.gezondheidenwetenschap.be/richtlijnen/prikkelbaredarmsyndroom-pds"
					target="_blank"
					rel="noopener noreferrer">
					pbs
				</a>
				) krijg ik vaak volgende vragen
			</h3>
			<ul className="flex flex-col space-y-8">
				<li>
					<Link href={"/cant-eats"} className="flex items-center space-x-2">
						<button>
							<AuthCheck
								permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
								showLockIcon={true}>
								<GiPoisonBottle />
							</AuthCheck>
						</button>
						<span>Wat mag je niet eten?</span>
					</Link>
				</li>
				<li>
					<Link href={"/likes"} className="flex items-center space-x-2">
						<button>
							<AuthCheck
								permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
								showLockIcon={true}>
								<BiLike />
							</AuthCheck>
						</button>{" "}
						<span>Wat mag je dan wel eten?</span>
					</Link>
				</li>
				<li>
					<Link href={"/recipes"} className="flex items-center space-x-2">
						<button>
							<PiCookingPotBold />
						</button>
						<span>Wat maak jij dan zoal?</span>
					</Link>
				</li>
			</ul>
			<footer className="fixed bottom-2 flex items-center space-x-2">
				<HiLockClosed />
				<p className="italic text-xs"> Enkel toegangelijk met wachtwoord</p>
			</footer>
		</div>
	);
}
