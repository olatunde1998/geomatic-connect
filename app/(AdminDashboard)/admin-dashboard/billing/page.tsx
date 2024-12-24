import { auth } from "@/auth";
import BillingHome from "@/app/components/admin-components/BillingHome";
import { redirect } from "next/navigation";

export default async function BillingPage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <BillingHome token={token} />
    </div>
  );
}
