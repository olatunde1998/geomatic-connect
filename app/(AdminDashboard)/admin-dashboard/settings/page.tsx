import { auth } from "@/auth";
import Settings from "@/app/components/admin-components/Settings";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?._id;
  if (!session?.user) redirect("/login");

  return (
    <main className="min-h-screen  pt-32  xl:p-2 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Settings</p>
        <p className="text-gray-500">Manage the settings of your account</p>
      </div>
      <section className="h-fit border mt-8 p-6 rounded-md">
        <Settings token={token} userId={userId} />
      </section>
    </main>
  );
}
