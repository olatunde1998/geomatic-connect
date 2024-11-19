import { auth } from "@/auth";
import AdminHome from "@/app/components/admin-components/AdminHome";

export default async function HomePage() {
  const session = await auth();
  const token = session?.user?.token;
  return (
    <div>
      <AdminHome token={token} />
    </div>
  );
}
