import NavMenu from "./NavMenu";
import "@/styles/globals.css";
import { Roboto_Flex } from "next/font/google";
import AuthProvider from "../components/auth/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

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
		<AuthProvider>
			<html lang="en" suppressHydrationWarning={true}>
				<body className={roboto.className}>
					<NavMenu />
					<main className="mt-4"> {children}</main>
				</body>
				<Analytics />
			</html>
		</AuthProvider>
	);
}
