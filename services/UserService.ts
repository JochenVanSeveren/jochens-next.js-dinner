// services/UserService.ts
import { User } from "next-auth";
import { IUserService } from "./InterfaceUserService";
import { prisma } from "@/lib/prisma";

export class InMemoryUserService implements IUserService {
	async signInCredentials(password: string): Promise<User | Promise<User>> {
		if (password === process.env.INVITED_USER_SECRET) {
			const user = (await prisma.user.findUnique({
				where: {
					id: "clirgjfrk000008mo2j8y52px",
				},
			})) as User;

			if (!user) {
				throw new Error("User not found");
			}
			return user;
		} else {
			throw new Error("Invalid password");
		}
	}
	async signInDemoCredentials(): Promise<User | Promise<User>> {
		const user = (await prisma.user.findUnique({
			where: {
				id: "clirgjfrk000008mo2j8y52py",
			},
		})) as User;

		if (!user) {
			throw new Error("User not found");
		}
		return user;
	}

	async signInDemoAdminCredentials(): Promise<User | Promise<User>> {
		const user = (await prisma.user.findUnique({
			where: {
				id: "clirgjfrk000008mo2j8y52pz",
			},
		})) as User;

		if (!user) {
			throw new Error("User not found");
		}
		return user;
	}
}

export const userService = new InMemoryUserService();
