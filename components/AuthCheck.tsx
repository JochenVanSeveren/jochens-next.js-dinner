"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck({
	children,
	permittedRoles: permittedRoles = ["USER"],
}: {
	children: React.ReactNode;
	permittedRoles: string[];
}) {
	const { data: session, status } = useSession();

	if (status === "authenticated" && authorized(session, permittedRoles)) {
		return <>{children}</>;
	} else {
		if (
			permittedRoles.includes("ADMIN") ||
			permittedRoles.includes("DEMO_ADMIN")
		)
			return <>Deze pagina is enkel voor admins</>;

		return (
			<>Deze pagina is enkel voor uitgenodigde gebruikers of demo gebruikers</>
		);
	}
}

function authorized(session: any, permittedRoles: string[]) {
	return permittedRoles.includes(session?.user?.role);
}
