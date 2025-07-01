import JobDetails from "@/app/components/job-listings/JobDetails";

export default function JobDetailsPage({ params }: { params: any }) {
  const jobId = params?.jobId;
  return (
    <div className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <JobDetails jobId={jobId} />
    </div>
  );
}
