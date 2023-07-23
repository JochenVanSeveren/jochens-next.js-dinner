"use client";

import { useSession } from "next-auth/react";
import { HiLockClosed } from "react-icons/hi";

export default function AuthCheck({
	children,
	permittedRoles: permittedRoles = ["USER"],
	showLockIcon = false,
}: {
	children: React.ReactNode;
	permittedRoles: string[];
	showLockIcon?: boolean;
}) {
	const { data: session, status } = useSession();

	if (status === "authenticated" && authorized(session, permittedRoles)) {
		return <>{children}</>;
	} else {
		return showLockIcon ? <HiLockClosed /> : <></>;
	}
}

function authorized(session: any, permittedRoles: string[]) {
	return permittedRoles.includes(session?.user?.role);
}
