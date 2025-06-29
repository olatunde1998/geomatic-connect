import JobHome from "@/app/components/job-listings/JobHome";

export default function JobListingPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Job Listing Page</h1>
      <p className="text-muted-foreground mb-6">
        List of Available job, check it out and apply!
      </p>
      <JobHome />
    </div>
  );
}
