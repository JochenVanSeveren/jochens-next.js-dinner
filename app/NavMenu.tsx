import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/NavMenu.module.css";
import { AuthButton } from "@/components/auth/AuthButtons";
import { PiCookingPotBold } from "react-icons/pi";
import { GiPoisonBottle } from "react-icons/gi";
import { BiLike } from "react-icons/bi";
import AuthCheck from "@/components/auth/AuthCheck";

export default function NavMenu() {
	return (
		<nav className={styles.nav}>
			<button>
				<Link href={"/"}>
					<Image
						src="/logo2.svg" // Route of the image file
						width={40}
						height={40}
						alt="Logo"
					/>
				</Link>
			</button>
			<ul className={styles.links}>
				<li>
					<Link href={"/cant-eats"}>
						<AuthCheck
							permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
							showLockIcon={true}>
							<GiPoisonBottle className="sm:hidden" />
							<span className="hidden sm:block">Cant-eats</span>
						</AuthCheck>
					</Link>
				</li>
				<li>
					<Link href={"/likes"}>
						<AuthCheck
							permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
							showLockIcon={true}>
							<BiLike className="sm:hidden" />
							<span className="hidden sm:block">Likes</span>
						</AuthCheck>
					</Link>
				</li>
				<li>
					<Link href={"/recipes"}>
						{" "}
						<PiCookingPotBold className="sm:hidden" />
						<span className="hidden sm:block">Recipes</span>
					</Link>
				</li>
			</ul>
			<div className="mr-0">
				<AuthButton />
			</div>
		</nav>
	);
}
