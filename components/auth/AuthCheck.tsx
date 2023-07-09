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
		return <></>;
	}
}

function authorized(session: any, permittedRoles: string[]) {
	return permittedRoles.includes(session?.user?.role);
}
