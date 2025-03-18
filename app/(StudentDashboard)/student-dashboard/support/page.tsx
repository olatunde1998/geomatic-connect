// import Notification from "@/app/components/student-components/Notifications";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import TawkChat from "@/app/components/chatbot/TawkChat";

export const metadata: Metadata = {
  title: "Support | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};

export default async function SupportPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Support</p>
      </div>
      <section className="h-fit border mt-8 rounded-md">
        <TawkChat />
      </section>
    </main>
  );
}
