"use client";

import { useState } from "react";
import {
	getCsrfToken,
	getProviders,
	signIn,
	useSession,
} from "next-auth/react";

export default async function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const { data: session, status } = useSession();

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	if (status === "authenticated") {
		return (
			<div className="text-center py-8">
				<h1 className="text-2xl font-bold mb-4">Already signed in please</h1>
				<p className="text-lg">Sign out first</p>
			</div>
		);
	}

	const csrfToken = await getCsrfToken();
	const providers = await getProviders();

	return (
		<div className="space-y-4 sm:max-w-sm ml-auto mr-auto">
			{providers &&
				Object.values(providers).map((provider) => (
					<div key={provider.name} className="flex flex-col space-y-2">
						{provider.id === "USER_CREDENTIALS" ? (
							<form
								method="post"
								action="/api/auth/callback/USER_CREDENTIALS"
								className="space-y-2 w-full">
								<input
									name="csrfToken"
									type="hidden"
									defaultValue={csrfToken}
								/>
								<div className="relative">
									<input
										name="password"
										type={showPassword ? "text" : "password"}
										required
										placeholder="Wachtwoord"
										className="input input-bordered w-full p-1"
									/>
									<button
										type="button"
										onClick={togglePassword}
										className="absolute inset-y-0 right-0 px-3 py-2 text-sm"
										style={{ backgroundColor: "#edc45c" }}>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>
								<button
									style={{
										width: "100%",
										marginTop: "2rem",
										backgroundColor: "#edc45c",
									}}
									type="submit">
									Log in met {provider.name}
								</button>
							</form>
						) : (
							<button onClick={() => signIn(provider.id)}>
								Log in met {provider.name}
							</button>
						)}
					</div>
				))}
		</div>
	);
}
