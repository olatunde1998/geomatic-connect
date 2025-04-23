"use client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      let attempts = 0;
      const maxAttempts = 3;

      const checkSession = async () => {
        attempts++;
        const session = await getSession();

        if (session?.user?.token && session?.user?.role) {
          const routeMap = {
            Admin: "/admin-dashboard",
            Company: "/company-dashboard",
            User: "/student-dashboard",
          };

          const route =
            routeMap[session.user.role as keyof typeof routeMap] ||
            "/student-dashboard";
          return router.push(route);
        } else if (attempts < maxAttempts) {
          setTimeout(checkSession, 500); // Try again after 500ms
        } else {
          toast.error("Unable to verify your session");
          return router.push("/login");
        }
      };

      await checkSession();
    };

    redirectUser();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="animate-pulse text-lg font-medium">
        Verifying your session and redirecting...
      </p>
    </div>
  );
}
