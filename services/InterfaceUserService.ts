// services/IUserService.ts
import { User } from "next-auth";
export interface IUserService {
	signInCredentials(password: string): Promise<Promise<User> | User>;
}
