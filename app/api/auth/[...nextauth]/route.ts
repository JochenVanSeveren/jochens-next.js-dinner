import NextAuth from "next-auth";
import type { NextAuthOptions, DefaultSession, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User as PrismaUser } from "@prisma/client";

interface User extends PrismaUser {
	role: string;
}

declare module "next-auth" {
	interface Session {
		user: User & DefaultSession["user"];
	}

	interface User extends PrismaUser {}

	interface JWT extends Record<string, any> {
		role: string;
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "given password",
			credentials: {
				password: {
					label: "password",
					type: "password",
					placeholder: "password",
				},
			},
			async authorize(credentials) {
				let user: User | null = null;
				if (credentials?.password === process.env.INVITED_USER_SECRET) {
					user = await prisma.user.findUnique({
						where: {
							id: "clirgjfrk000008mo2j8y52px",
						},
					});
				}
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	callbacks: {
		session({ session, token, user }) {
			if (token) {
				session.user.role = token.role;
			}
			return session;
		},
		jwt({ token, user, account, profile }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
	},
	session: {
		// Set to jwt in order to CredentialsProvider works properly
		strategy: "jwt",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
