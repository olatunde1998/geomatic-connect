import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StudentHome from "@/app/components/student-components/StudentHome";
import TawkChat from "@/app/components/chatbot/TawkChat";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};
export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
      <p className="mt-16  p-3 bg-[#FEF3F2] text-red-500 text-center text-sm  lg:mt-10 xl:mt-2 xl:mb-">
        Unlock More Opportunities: Upgrade now to unlock exclusive access to
        more companies and exciting opportunities.
        <Link
          href="/student-dashboard/billing"
          className="font-bold text-sm underline ml-1.5"
        >
          Upgrade now!
        </Link>
      </p>
      <StudentHome session={session} />
      <TawkChat />
    </main>
  );
}
