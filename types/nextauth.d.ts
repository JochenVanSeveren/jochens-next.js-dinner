// nextauth.d.ts
import { Prisma } from "@prisma/client";
import { User as PrismaUser } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

// Define a role enum
export enum Role {
	user = "USER",
	admin = "ADMIN",
}
// common interface for JWT and Session
interface IUser extends DefaultUser, PrismaUser {
	role?: Role;
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
