import BlogHome from "@/app/components/landing-page-components/BlogHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore latest articles about geomatics",
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
