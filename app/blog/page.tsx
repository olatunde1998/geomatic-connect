import BlogHome from "@/app/components/landing-page-components/BlogHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore latest articles about geomatics",
};
export default async function BlogHomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-primary-foreground  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:1500px_100px]">
        <div className="w-full max-w-5xl text-sm">
          <BlogHome />
        </div>
      </main>
    </>
  );
}
