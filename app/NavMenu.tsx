import Link from "next/link";
import Image from "next/image";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
	return (
		<nav className={styles.nav}>
			<Link href={"/"}>
				<Image
					src="/logo2.svg" // Route of the image file
					width={50}
					height={50}
					alt="Logo"
				/>
			</Link>
			<ul className={styles.links}>
				<li>
					<Link href={"/recipes"}>Recipes</Link>
				</li>
				<li>
					<Link href={"/cant-eats"}>Cant-eats</Link>
				</li>
				<li>
					<Link href={"/preferences"}>Preferences</Link>
				</li>
				{/* TODO: change to account icon */}
				<li>
					<Link href={"/account"}>Acc</Link>
				</li>
			</ul>
		</nav>
	);
}
