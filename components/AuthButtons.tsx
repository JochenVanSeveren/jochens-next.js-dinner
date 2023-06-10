"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <>...</>;
	}

	if (status === "authenticated") {
		return (
			<div>
				Hello {session?.user?.name} <SignOutButton />
			</div>
		);
	}

	return <button onClick={() => signIn()}>Sign in</button>;
}

function SignOutButton() {
	return <button onClick={() => signOut()}>Sign out</button>;
}
