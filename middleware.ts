import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
	const { pathname } = request.nextUrl;

	const allUserProtectedPaths = ["/cant-eats"];
	const allAdminProtectedPaths = ["/recipes/edit/"];

	const matchesAllusersProtectedPath = allUserProtectedPaths.some((path) =>
		pathname.startsWith(path)
	);
	const matchesAdminProtectedPath = allAdminProtectedPaths.some((path) =>
		pathname.startsWith(path)
	);

	if (matchesAllusersProtectedPath || matchesAdminProtectedPath) {
		const token = await getToken({ req: request });
		if (!token) {
			const url = new URL(`/api/auth/signin`, request.url);
			url.searchParams.set("callbackUrl", encodeURI(request.url));

			return NextResponse.redirect(url);
		}

		if (matchesAdminProtectedPath && token.role !== "ADMIN") {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}

		if (
			matchesAllusersProtectedPath &&
			token.role !== "ADMIN" &&
			token.role !== "USER"
		) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}
