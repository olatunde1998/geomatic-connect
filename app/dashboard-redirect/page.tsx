// OPTION 0
"use client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function DashboardRedirect() {
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

// OPTION 1

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/react";

// export default function DashboardRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     const redirectUser = async () => {
//       const session = await getSession();

//       if (session?.user?.role === "Admin") {
//         router.push("/admin-dashboard");
//       } else if (session?.user?.role === "Company") {
//         router.push("/company-dashboard");
//       } else {
//         router.push("/student-dashboard");
//       }
//     };

//     redirectUser();
//   }, [router]);

//   return <p>Redirecting you to your dashboard...</p>;
// }

// OPTION 2

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/react";

// export default function DashboardRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     const redirectUser = async () => {
//       const session = await getSession();
//       const defaultRoute = "/student-dashboard";

//       if (!session?.user) {
//         return router.push("/login");
//       }

//       const routeMap = {
//         Admin: "/admin-dashboard",
//         Company: "/company-dashboard",
//         User: "/student-dashboard",
//       };

//       const route =
//         routeMap[session.user.role as keyof typeof routeMap] || defaultRoute;
//       router.push(route);
//     };

//     redirectUser();
//   }, [router]);

//   return <p>Redirecting you to your dashboard...</p>;
// }
