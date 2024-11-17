import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  const token = session?.user?.token;
  return (
    <main className="flex min-h-screen flex-col pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold">Settings</p>
        <p className="text-sm text-gray-500 font-normal">
          Manage the settings of your account
        </p>
      </div>
    </main>
  );
}
