import { auth } from "@/auth";
import AdminHome from "@/app/components/admin-components/AdminHome";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) redirect("/login");
  return (
    <div>
      <AdminHome token={token} />
    </div>
  );
}
