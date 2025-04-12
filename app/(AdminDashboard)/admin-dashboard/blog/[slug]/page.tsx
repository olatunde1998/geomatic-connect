import BlogDetails from "@/app/components/admin-components/BlogDetails";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function BlogDetailsPage({ params }: { params: any }) {
  const session = await auth();
  const blogSlug = params?.slug;
  const token = session?.user?.token;

  if (!blogSlug) {
    redirect("/login");
  }
  return (
    <>
      <main className="min-h-screen lg:p-12 xl:p-20 xl:px-2">
        <BlogDetails blogSlug={blogSlug} token={token} />
      </main>
    </>
  );
}
