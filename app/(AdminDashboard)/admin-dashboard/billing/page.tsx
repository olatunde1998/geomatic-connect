import TransactionList from "@/app/components/admin-components/TransactionList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function BillingPage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user) redirect("/login");
  return (
    <main className="flex min-h-screen flex-col pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold">
          Manage Transactions
        </p>
        <p className="text-sm text-gray-500 font-normal">
          Administer transactions histories within the platform.
        </p>
      </div>
      <div className="my-8 grid space-y-6 lg:space-y-0 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6">
        <StatisticsCard title={"Total Transaction"} value={30} />
        <StatisticsCard title={"Success Transaction"} value={20} />
        <StatisticsCard title={"Failed Transaction"} value={6} />
        <StatisticsCard title={"Abandoned Transaction"} value={4} />
      </div>

      <TransactionList token={token} />
    </main>
  );
}
