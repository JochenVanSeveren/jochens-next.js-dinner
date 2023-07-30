import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { userService } from "@/services/UserService";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
if (!process.env.NEXTAUTH_SECRET) {
	throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

enum Role {
	ADMIN = "ADMIN",
	DEMO_ADMIN = "DEMO_ADMIN",
	USER = "USER",
	DEMO_USER = "DEMO_USER",
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			profile(profile) {
				return {
					role:
						profile.email === process.env.REAL_ADMIN_EMAIL
							? Role.ADMIN
							: Role.DEMO_ADMIN,
					id: profile.id.toString(),
					name: profile.name,
					email: profile.email,
					bio: profile.bio,
					age: profile.age,
					emailVerified: profile.emailVerified,
				};
			},
		}),
		CredentialsProvider({
			name: "wachtwoord",
			id: "USER_CREDENTIALS",
			credentials: {
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error("No credentials.");
				}
				const { password } = credentials;
				try {
					const user = await userService.signInCredentials(
						password.toLowerCase()
					);
					return user;
				} catch (error) {
					return null;
				}
			},
		}),
		// CredentialsProvider({
		// 	name: "demo user",
		// 	id: "DEMO_USER_CREDENTIALS",
		// 	credentials: {},
		// 	async authorize(credentials) {
		// 		try {
		// 			const user = await userService.signInDemoCredentials();
		// 			return user;
		// 		} catch (error) {
		// 			return null;
		// 		}
		// 	},
		// }),
		// CredentialsProvider({
		// 	name: "demo admin",
		// 	id: "DEMO_ADMIN_CREDENTIALS",
		// 	credentials: {},
		// 	async authorize(credentials) {
		// 		try {
		// 			const user = await userService.signInDemoAdminCredentials();
		// 			return user;
		// 		} catch (error) {
		// 			return null;
		// 		}
		// 	},
		// }),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role;
				session.user.id = token.id;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
	},
};
