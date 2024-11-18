import { auth } from "@/auth";
import Settings from "@/app/components/student-components/Settings";

export default async function SettingsPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?._id;

  return (
    <main className="min-h-screen  p-6 pt-32  lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Settings</p>
        <p className="text-gray-500">Manage the settings of your account</p>
      </div>
      <section className="h-fit border border-accent-primary mt-8 p-6 rounded-md">
        <Settings token={token} userId={userId} />
      </section>
    </main>
  );
}
