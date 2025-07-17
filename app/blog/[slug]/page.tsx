import BlogDetails from "@/app/components/admin-components/BlogDetails";
import { redirect } from "next/navigation";

export default async function BlogDetailsPage({ params }: { params: any }) {
  const blogSlug = params?.slug;

  if (!blogSlug) {
    redirect("/blog");
  }
  return (
    <>
      <main className="min-h-screen p-4 lg:p-12 xl:py-20 pb-32 xl:px-2 bg-primary-foreground  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:1500px_100px]">
        <div className="max-w-3xl mx-auto">
          <BlogDetails blogSlug={blogSlug} />
        </div>
      </main>
    </>
  );
}
