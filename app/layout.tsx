import NavMenu from "./NavMenu";
import "./globals.css";
import { Roboto_Flex } from "next/font/google";

export const metadata = {
	title: "jochens-next-dinner",
	description:
		"Website testing out next.js 13 newest features. It details jochens dinner requirements (own recipes, preferences, cant eats...)",
};

const roboto = Roboto_Flex({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<NavMenu />
				{children}
			</body>
		</html>
	);
}
