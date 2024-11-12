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
          <div className="grid flex-1 gap-12">
            <div className="hidden w-[200px] fixed flex-col md:block border-r border-accent ml-10 pt-32 pr-2 min-h-screen">
              <AdminSidebar />
            </div>
            <main className="px-6 md:pl-72 md:pr-12">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
