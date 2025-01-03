import CompanyNavBar from "@/app/components/navbar/CompanyNavBar";
import { CompanySidebar } from "@/app/components/sidebar/CompanySidebar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geomatic Connect | Company",
  description: "Geomatic Connect Application Dashboard",
};

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className={inter.className}>
      <CompanyNavBar session={session} />
      <div className="flex flex-col space-y-6">
        <div className="grid flex-1 gap-12 ">
          <div className="hidden w-[200px] md:w-[160px] lg:w-[160px] xl:w-[200px] fixed flex-col lg:block border-r ml-6 pr-2 lg:ml-10 pt-32 min-h-screen">
            <CompanySidebar session={session} />
          </div>
          <main className="lg:pl-48 xl:pl-52 xl:pr-6 overflow-x-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
