import type { Metadata } from "next";
import { auth } from "@/auth";
import RequestsHome from "@/app/components/admin-components/RequestsHome";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Requests | Geomatic Connect",
  description:
    "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
};
export default async function RequestsPage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <RequestsHome token={token} />
    </div>
  );
}
