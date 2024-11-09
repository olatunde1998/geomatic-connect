import DashboardNavBar from "@/app/components/navbar/DashboardNavBar";
import { AdminSidebar } from "@/app/components/sidebar/AdminSidebar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geomatic Connect",
  description: "Geomatic Connect Application Dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <div className={inter.className}>
        <DashboardNavBar session={session} />
        <div className="flex flex-col space-y-6">
          <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] ">
            <aside className="hidden w-[200px] flex-col md:flex border-r border-accent ml-10 pt-32 pr-2">
              <AdminSidebar />
            </aside>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
