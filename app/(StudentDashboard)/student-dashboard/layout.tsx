import Navbar from "@/app/components/navbar/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geomatic Connect",
  description: "Geomatic Connect Application Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#F8F9FC]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
