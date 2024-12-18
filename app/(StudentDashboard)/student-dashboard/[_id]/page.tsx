import StudentDetails from "@/app/components/student-components/StudentDetails";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

// Helper function to validate the companyId
const isValidCompanyId = (id: any) => {
  const regex = /^[a-f\d]{24}$/i; // Regex for a 24-character MongoDB ObjectId
  return regex.test(id);
};

export default async function StudentDetailsPage({ params }: { params: any }) {
  const session = await auth();
  const companyId = params?._id;

  if (!session?.user) redirect("/login");

  if (!companyId || !isValidCompanyId(companyId)) {
    notFound(); // Returns a 404 page
  }
  return (
    <>
      <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
        <StudentDetails companyId={companyId} session={session} />
      </main>
    </>
  );
}
