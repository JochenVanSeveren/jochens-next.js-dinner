import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
enum Role {
	ADMIN = "ADMIN",
	DEMO_ADMIN = "DEMO_ADMIN",
	USER = "USER",
	DEMO_USER = "DEMO_USER",
}
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/api")) {
		const { headers } = request;
		const apiKey = headers.get("x-api-key");

		if (apiKey !== process.env.MY_API_KEY) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			return NextResponse.next();
		}
	}

	const allUserProtectedPaths = ["/cant-eats", "/likes"];
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

		if (
			matchesAdminProtectedPath &&
			!(token.role === Role.ADMIN || token.role === Role.DEMO_ADMIN)
		) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}

		if (
			matchesAllusersProtectedPath &&
			!(
				token.role === Role.ADMIN ||
				token.role === Role.USER ||
				token.role === Role.DEMO_ADMIN ||
				token.role === Role.DEMO_USER
			)
		) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}
