import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
	"/products": "/collections",
};

export function middleware(request: NextRequest) {
	const destination = REDIRECTS[request.nextUrl.pathname];
	if (destination) {
		return NextResponse.redirect(new URL(destination, request.url));
	}
}

export const config = {
	matcher: ["/products"], // doit être statique
};
