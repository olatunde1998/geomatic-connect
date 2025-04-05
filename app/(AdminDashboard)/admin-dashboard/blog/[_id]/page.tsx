import BlogDetails from "@/app/components/admin-components/BlogDetails";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function StudentDetailsPage({ params }: { params: any }) {
  const session = await auth();
  const blogId = params?._id;

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <>
      <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2">
        <BlogDetails blogId={blogId} />
      </main>
    </>
  );
}
