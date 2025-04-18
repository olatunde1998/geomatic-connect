import BlogHome from "@/app/components/company-components/BlogHome";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blog | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};
export default async function BlogHomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between max-w-7xl mx-auto lg:p-12 xl:p-20 xl:px-2 xl:pl-12">
        <div className="w-full text-sm">
          <BlogHome />
        </div>
      </main>
    </>
  );
}
