import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user?: {
			role: string;
		} & DefaultSession["user"];
	}
	interface User {
		id: string;
		name: string;
		email?: string;
		role: string;
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "As invited user",
			credentials: {
				passphrase: { label: "passphrase", type: "password" },
			},
			async authorize() {
				const user = {
					id: Math.random().toString(),
					name: "Demo User",
					email: "demo@demo.com",
					role: "DEMO_USER",
				};
				return user;
			},
		}),
		CredentialsProvider({
			name: "as demo user",
			credentials: {},
			async authorize() {
				const user = {
					id: Math.random().toString(),
					name: "Demo User",
					email: "demo@demo.com",
					role: "DEMO_USER",
				};
				return user;
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				// const user = await prisma.user.findUnique({
				// 	where: {
				// 		password: credentials?.password,
				// 	},
				// });
				// if (user) {
				// 	return user;
				// } else {
				// 	return null;
				// }
				if (credentials?.password === "password") {
					return {
						id: Math.random().toString(),
						name: "Demo User",
						role: "DEMO_USER",
					};
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.role = user.role;
			}
			return session;
		},
	},

	pages: {
		signIn: "/auth/signin",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
