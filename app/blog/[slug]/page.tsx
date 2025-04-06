import BlogDetails from "@/app/components/admin-components/BlogDetails";
import { redirect } from "next/navigation";

export default async function BlogDetailsPage({ params }: { params: any }) {
  const blogSlug = params?.slug;

  if (!blogSlug) {
    redirect("/blog");
  }
  return (
    <>
      <main className="min-h-screen p-4 lg:p-12 xl:py-20 pb-32 xl:px-2 bg-[#F6F8FD]">
        <div className="max-w-3xl mx-auto">
          <BlogDetails blogSlug={blogSlug} />
        </div>
      </main>
    </>
  );
}
