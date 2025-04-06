import type { Metadata } from "next";
import BlogHome from "@/app/components/landing-page-components/BlogHome";

export const metadata: Metadata = {
  title: "Blog | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};
export default async function BlogHomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-[#F6F8FD]">
        <div className="w-full max-w-5xl text-sm">
          <BlogHome />
        </div>
      </main>
    </>
  );
}
