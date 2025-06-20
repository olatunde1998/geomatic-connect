import { AdminSidebar } from "@/app/components/sidebar/AdminSidebar";
import BottomNavBar from "@/app/components/navbar/BottomNavBar";
import AdminNavBar from "@/app/components/navbar/AdminNavBar";
import TawkChat from "@/app/components/chatbot/TawkChat";
// import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/auth";

const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.png`;
const APP_NAME = "Geomatic Connect";
const APP_DEFAULT_TITLE = "Geomatic Connect | Admin";
const APP_TITLE_TEMPLATE = "%s - Geomatic Connect";
const APP_DESCRIPTION =
  "Geomatic Connect  is a job platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.";

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
    // startUpImage: [],
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [imageUrl],
  },
  twitter: {
    card: "summary_large_image",
    site: `${process.env.NEXT_PUBLIC_APP_URL}`,
    creator: "Geomatic Connect Teams",
    title: APP_DEFAULT_TITLE,
    description:
      "Register, Make Request and got accepted into your desired company!",
    images: [imageUrl],
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminNavBar session={session} />
        <div className="flex flex-col space-y-6">
          <div className="grid flex-1 gap-12 ">
            <div className="hidden w-[200px] md:w-[160px] lg:w-[160px] xl:w-[200px] fixed flex-col lg:block border-r ml-6 pr-2 lg:ml-10 pt-32 min-h-screen">
              <AdminSidebar />
            </div>
            <main className="px-6 lg:pl-60 xl:pl-72 md:pr-12 overflow-x-auto pb-28 md:pb-10">
              {children}
            </main>
            <BottomNavBar />
            <TawkChat />
            {/* <Analytics /> */}
          </div>
        </div>
      </div>
    </>
  );
}
