"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";

export function AuthButton() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <>...</>;
	}

	//TODO: add skeleton loader

	if (status === "authenticated") {
		return (
			<div className="flex">
				<span className="hidden sm:block">Hello {session?.user?.name} </span>
				<SignOutButton />
			</div>
		);
	}

	return (
		<button onClick={() => signIn()}>
			<CiLogin className="sm:hidden" />
			<span className="hidden sm:block">Sign in</span>
		</button>
	);
}

function SignOutButton() {
	return (
		<button onClick={() => signOut()}>
			<CiLogout className="sm:hidden" />
			<span className="hidden sm:block">Sign out</span>
		</button>
	);
}
