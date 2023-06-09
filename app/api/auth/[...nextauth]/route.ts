import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "as demo user",
			credentials: {},
			async authorize(credentials) {
				const user = {
					id: Math.random().toString(),
					name: "Demo User",
					email: "demo@demo.com",
				};
				return user;
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
