import AdminNavBar from "@/app/components/navbar/AdminNavBar";
import { AdminSidebar } from "@/app/components/sidebar/AdminSidebar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s",
    default: "Geomatic Connect | Admin",
  },
  description:
    "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  twitter: {
    card: "summary_large_image",
    site: `${process.env.NEXT_PUBLIC_APP_URL}`,
    creator: "Geomatic Connect Teams",
    title: "Geomatic Connect",
    description:
      "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
    images: ["/images/opengraph-image.png"],
  },
  openGraph: {
    images: ["/images/opengraph-image.png"],
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
