import StudentNavBar from "@/app/components/navbar/StudentNavBar";
import { StudentSidebar } from "@/app/components/sidebar/StudentSidebar";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s",
    default: "Geomatic Connect | Student",
  },
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
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
    title: "Geomatic Connect | Student",
    description:
      "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
    images: ["/images/opengraph-image.png"],
  },
  openGraph: {
    images: ["/images/opengraph-image.png"],
  },
};

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className={inter.className}>
      <StudentNavBar session={session} />
      <div className="flex flex-col space-y-6">
        <div className="grid flex-1 gap-12 ">
          <div className="hidden w-[200px] md:w-[160px] lg:w-[160px] xl:w-[200px] fixed flex-col lg:block border-r ml-6 pr-2 lg:ml-10 pt-32 min-h-screen">
            <StudentSidebar session={session} />
          </div>
          <main className="lg:pl-48 xl:pl-52 xl:pr-6 overflow-x-auto">
            {children}
            <Analytics />
          </main>
        </div>
      </div>
    </div>
  );
}
