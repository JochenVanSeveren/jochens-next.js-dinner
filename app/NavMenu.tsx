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
			<button className="h-6">
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
				<li className="flex items-center">
					<Link href={"/cant-eats"}>
						<AuthCheck
							permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
							showLockIcon={true}>
							<div className="flex items-center space-x-2">
								<GiPoisonBottle />
								<span className="hidden sm:block">Cant-eats</span>
							</div>
						</AuthCheck>
					</Link>
				</li>
				<li className="flex items-center">
					<Link href={"/likes"}>
						<AuthCheck
							permittedRoles={["USER", "ADMIN", "DEMO_ADMIN", "DEMO_USER"]}
							showLockIcon={true}>
							<div className="flex items-center space-x-2">
								<BiLike />
								<span className="hidden sm:block">Likes</span>
							</div>
						</AuthCheck>
					</Link>
				</li>
				<li className="flex items-center">
					<Link href={"/recipes"}>
						<div className="flex items-center space-x-2">
							<PiCookingPotBold />
							<span className="hidden sm:block">Recipes</span>
						</div>
					</Link>
				</li>
			</ul>

			<div className="mr-0">
				<AuthButton />
			</div>
		</nav>
	);
}
