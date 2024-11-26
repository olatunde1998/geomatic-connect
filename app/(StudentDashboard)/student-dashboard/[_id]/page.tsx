import StudentDetails from "@/app/components/student-components/StudentDetails";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function StudentDetailsPage({ params }: { params: any }) {
  const session = await auth();
  const companyId = params._id;

  if (!session?.user) redirect("/login");
  return (
    <>
      <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
        <StudentDetails companyId={companyId} session={session} />
      </main>
    </>
  );
}
