import BlogDetails from "@/app/components/admin-components/BlogDetails";
import { redirect } from "next/navigation";

export default async function BlogDetailsPage({ params }: { params: any }) {
  const blogSlug = params?.slug;

  if (!blogSlug) {
    redirect("/blog");
  }
  return (
    <>
      <main className="min-h-screen px-6 pt-4 lg:p-12 xl:p-20">
        <BlogDetails blogSlug={blogSlug} />
      </main>
    </>
  );
}
