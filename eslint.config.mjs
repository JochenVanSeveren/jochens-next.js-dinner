import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
	...coreWebVitals,
	{
		ignores: [
			".next/**",
			"node_modules/**",
			"cypress/**",
			"prisma/seedDev.ts",
			"prisma/seedMock.ts",
		],
	},
];

export default config;
