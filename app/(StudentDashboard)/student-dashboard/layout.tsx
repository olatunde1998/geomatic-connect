import DashboardNavBar from "@/app/components/navbar/DashboardNavBar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geomatic Connect",
  description: "Geomatic Connect Application Dashboard",
};

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className={inter.className}>
      <div className="bg-[#F8F9FC]">
        <DashboardNavBar session={session} />
        {children}
      </div>
    </div>
  );
}
