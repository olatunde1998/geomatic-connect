import CompanyHome from "@/app/components/company-components/CompanyHome";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
      <CompanyHome session={session} />
    </main>
  );
}
