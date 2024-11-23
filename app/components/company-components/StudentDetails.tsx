"use client";

interface StudentDetailsProps {
  studentId?: any;
  session: any;
}

export default function StudentDetails({
  studentId,
  session,
}: StudentDetailsProps) {
  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        This is Student Id here === {studentId}
        {/*=====Complete  Profile Tabs ====== */}
      </div>
      {/* ================Body section ===========  */}
      <section className="mt-8">
        <div>
          <p>This is Student Profile Tab</p>
        </div>
      </section>
    </>
  );
}
