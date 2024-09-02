import StudentHome from "@/app/components/student-components/StudentHome";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 lg:p-12 xl:p-20">
      <StudentHome />
    </main>
  );
}
