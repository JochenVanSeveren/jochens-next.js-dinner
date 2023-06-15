import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { userService } from "@/services/UserService";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
if (!process.env.NEXTAUTH_SECRET) {
	throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error("No credentials.");
				}
				const { password } = credentials;
				try {
					const user = await userService.signInCredentials(password);
					return user;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
