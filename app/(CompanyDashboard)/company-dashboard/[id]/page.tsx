import StudentDetails from "@/app/components/company-components/StudentDetails";

export default function StudentDetailsPage({ params }: { params: any }) {
  const studentId = params.id;
  return (
    <>
      <main className="min-h-screen p-6 lg:p-12 xl:p-20">
        <StudentDetails studentId={studentId} />
      </main>
    </>
  );
}
