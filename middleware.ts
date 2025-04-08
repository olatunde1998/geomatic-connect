import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  "/blog",
  "/blog/(.*)",
  "/api/(.*)", // Allow all API routes
  "/_next/(.*)", // Allow Next.js static files
];

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (
    publicRoutes.some((route) => {
      const regex = new RegExp(`^${route.replace(/\*/g, ".*")}$`);
      return regex.test(pathname);
    })
  ) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
