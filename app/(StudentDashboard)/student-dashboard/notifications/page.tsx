import type { Metadata } from "next";
import { auth } from "@/auth";
import Notification from "@/app/components/student-components/Notifications";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notifications | Geomatic Connect",
  description:
    "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
};

export default async function NotificationPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?._id;
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Notification</p>
        <p className="max-w-[550px] leading-8 font-light">
          All paid plans allow using assets with no time limit and link to us.
          Unused downloads are transferred to the next period. Each account is
          for one user only.
        </p>
      </div>
      <section className="h-fit border mt-8 p-6 rounded-md">
        <Notification token={token} userId={userId} />
      </section>
    </main>
  );
}
