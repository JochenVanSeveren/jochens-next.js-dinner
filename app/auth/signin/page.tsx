"use client";

import { log } from "console";
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
			<div>
				<h1>Already signed in please</h1> <p>Sign out first</p>
			</div>
		);
	}

	const csrfToken = await getCsrfToken();
	const providers = await getProviders();

	console.log(providers);

	return (
		<>
			{providers &&
				Object.values(providers).map((provider) => (
					<div key={provider.name}>
						{provider.id === "USER_CREDENTIALS" ? (
							<form method="post" action="/api/auth/callback/USER_CREDENTIALS">
								<button type="submit">Sign in with {provider.name}</button>
								<input
									name="csrfToken"
									type="hidden"
									defaultValue={csrfToken}
								/>

								<label>
									Password
									<input name="password" type="password" required />
								</label>
							</form>
						) : (
							<button onClick={() => signIn(provider.id)}>
								Sign in with {provider.name}
							</button>
						)}
					</div>
				))}
		</>
	);
}
