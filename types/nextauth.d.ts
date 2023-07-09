// nextauth.d.ts
import { Prisma } from "@prisma/client";
import { User as PrismaUser } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

// BUG: importing Role into other files does not work
// Define a role enum
export enum Role {
	ADMIN = "ADMIN",
	DEMO_ADMIN = "DEMO_ADMIN",
	USER = "USER",
	DEMO_USER = "DEMO_USER",
}
// common interface for JWT and Session
interface IUser extends DefaultUser, PrismaUser {
	role?: Role | undefined;
}
declare module "next-auth" {
	interface User extends IUser {}
	interface Session {
		user?: User;
	}
}
declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
