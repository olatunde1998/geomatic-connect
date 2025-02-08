import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StudentHome from "@/app/components/student-components/StudentHome";

export const metadata: Metadata = {
  title: "Dashboard | Geomatic Connect",
  description:
    "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
};
export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
      <StudentHome session={session} />
    </main>
  );
}
