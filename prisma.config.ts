import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
		seed: "node prisma/seedMock.ts",
	},
	datasource: {
		url: env("DATABASE_URL"),
		shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
	},
});
