import UsersList from "@/app/components/admin-components/UsersList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  const token = session?.user?.token;
  return (
    <main className="flex min-h-screen flex-col pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold">Manage Users</p>
        <p className="text-sm text-gray-500 font-normal">
        Administer user accounts and privileges within the platform.
        </p>
      </div>
      <div className="my-8 grid space-y-6 lg:space-y-0 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6">
        <StatisticsCard title={"Total Users"} value={10} />
        <StatisticsCard title={"Total Requests"} value={20} />
        <StatisticsCard title={"Response Rate (%)"} value={40} />
        <StatisticsCard title={"Average Completion Time"} value={3} />
      </div>

      <UsersList token={token} />
    </main>
  );
}
