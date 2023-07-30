"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";

export function AuthButton() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<button className="h-6 flex items-center justify-center">
				<span className="loading loading-spinner w-4 h-4"></span>
			</button>
		);
	}

	if (status === "authenticated") {
		return <SignOutButton />;
	}

	return (
		<button className="h-6" onClick={() => signIn()}>
			<CiLogin className="sm:hidden" />
			<span className="hidden sm:block">Sign in</span>
		</button>
	);
}

function SignOutButton() {
	return (
		<button className="h-6" onClick={() => signOut()}>
			<CiLogout className="sm:hidden" />
			<span className="hidden sm:block">Sign out</span>
		</button>
	);
}
