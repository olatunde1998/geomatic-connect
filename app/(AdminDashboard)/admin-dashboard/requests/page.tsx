import { auth } from "@/auth";
import RequestsHome from "@/app/components/admin-components/RequestsHome";
import { redirect } from "next/navigation";

export default async function RequestsPage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) redirect("/login");
  return (
    <div>
      <RequestsHome token={token} />
    </div>
  );
}
