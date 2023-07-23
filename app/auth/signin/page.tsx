"use client";

import {
	getCsrfToken,
	getProviders,
	signIn,
	useSession,
} from "next-auth/react";

export default async function SignIn() {
	const { data: session, status } = useSession();

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
		<div className="space-y-4">
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

								<input
									name="password"
									type="password"
									required
									placeholder="Wachtwoord"
									className="input input-bordered w-full max-w-xs p-1"
								/>
								<button
									style={{ width: "100%", marginTop: "2rem" }}
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
