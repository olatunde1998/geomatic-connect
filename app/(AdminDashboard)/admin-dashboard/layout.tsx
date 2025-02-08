import AdminNavBar from "@/app/components/navbar/AdminNavBar";
import { AdminSidebar } from "@/app/components/sidebar/AdminSidebar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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
        <AdminNavBar session={session} />
        <div className="flex flex-col space-y-6">
          <div className="grid flex-1 gap-12 ">
            <div className="hidden w-[200px] md:w-[160px] lg:w-[160px] xl:w-[200px] fixed flex-col md:block border-r ml-6 pr-2 lg:ml-10 pt-32 min-h-screen">
              <AdminSidebar />
            </div>
            <main className="px-6 md:pl-52 lg:pl-60 xl:pl-72 md:pr-12 overflow-x-auto">
              {children}
              <Analytics />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
