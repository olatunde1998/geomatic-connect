// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // List of public pages that don't require authentication
  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
    "/blog",
  ];
  const isPublicPage =
    publicPages.includes(pathname) || pathname.startsWith("/blog/");

  // If it's not a public page and user isn't authenticated
  if (!session && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Keep your existing config
export const config = {
  matcher: [
    // "/((?!api|_next|.*\\..*).*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin-dashboard",
    "/company-dashboard",
    "/student-dashboard",
    "/admin-dashboard/:path*",
    "/company-dashboard/:path*",
    "/student-dashboard/:path*",
  ],
};