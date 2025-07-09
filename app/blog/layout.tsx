// import BottomNav from "@/app/components/navbar/BottomNav";
// import TawkChat from "@/app/components/chatbot/TawkChat";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/app/components/navbar/Navbar";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s",
    default: "Geomatic Connect",
  },
  description: "Explore latest articles about geomatics",
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
};

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-[1300px] mx-auto text-sm md:px-6">
          <Navbar />
        </div>
        {children}
        {/* <BottomNav /> */}
      </div>
    </>
  );
}
