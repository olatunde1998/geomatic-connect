import type { Metadata } from "next";
import { auth } from "@/auth";
import AdminHome from "@/app/components/admin-components/AdminHome";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};
export default async function HomePage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <AdminHome token={token} />
    </div>
  );
}
