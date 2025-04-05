import type { Metadata } from "next";
import Navbar from "@/app/components/navbar/Navbar";
import BottomNav from "@/app/components/navbar/BottomNav";
import BlogHome from "@/app/components/landing-page-components/BlogHome";

export const metadata: Metadata = {
  title: "Blog | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};
export default async function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-[#F6F8FD]">
        <div className="w-full flex-col items-center text-sm lg:flex">
          <div className="bg-[#F2F6F6 bg-primary-foreground lg:pt-8 w-full text-sm">
            <div className="max-w-[1300px] mx-auto text-sm md:px-6">
              <Navbar />
            </div>
          </div>
          <div className="w-full max-w-5xl">
            <BlogHome />
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
