import { CompanySidebar } from "@/app/components/sidebar/CompanySidebar";
import CompanyNavBar from "@/app/components/navbar/CompanyNavBar";
import BottomNavBar from "@/app/components/navbar/BottomNavBar";
// import TawkChat from "@/app/components/chatbot/TawkChat";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/auth";

// const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.png`;
const APP_NAME = "Geomatic Connect";
const APP_DEFAULT_TITLE = "Geomatic Connect | Company";
const APP_TITLE_TEMPLATE = "%s - Geomatic Connect";
const APP_DESCRIPTION =
  "Register, Make Request and got accepted into your desired company!";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  formatDetection: {
    telephone: false,
  },
};

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <CompanyNavBar session={session} />
      <div className="flex flex-col space-y-6">
        <div className="grid flex-1 gap-12 ">
          <div className="hidden w-[200px] md:w-[160px] lg:w-[160px] xl:w-[200px] fixed flex-col lg:block border-r ml-6 pr-2 lg:ml-10 pt-32 min-h-screen">
            <CompanySidebar session={session} />
          </div>
          <main className="lg:pl-48 xl:pl-52 xl:pr-6 overflow-x-auto pb-28 md:pb-10 mt-6">
            {children}
          </main>
          <BottomNavBar />
          {/* <TawkChat /> */}
        </div>
      </div>
    </div>
  );
}
