export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    "/admin-dashboard",
    "/company-dashboard",
    "/student-dashboard",
    "/admin-dashboard/:path*",
    "/company-dashboard/:path*",
    "/student-dashboard/:path*",
  ],
};
