"use client";
import JobListingCard from "@/app/components/cards/JobListingCard";
import CreateJob from "@/app/components/job-listings/CreateJob";
import { GetjobsRequest } from "@/app/services/job.request";
import { Modal } from "@/app/components/modals/Modal";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function JobHome() {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const role = session?.user?.role as string;
  const userId = session?.user?._id;
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["getJobsApi", currentPage],
    queryFn: () => GetjobsRequest(token, currentPage, limit),
  });

  return (
    <>
      {role === "Company" && (
        <div className="md:flex items-center md:space-x-4 mb-6">
          <div className="w-full">
            <p className="text-gray-600 text-lg font-semibold dark:text-accent-foreground">
              Job Listings
            </p>
            <p className="text-sm text-gray-500 font-normal">
              View and manage all job listings posted by your company.
            </p>
          </div>
          <div
            onClick={() => setShowCreateJob(true)}
            className="my-4 flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white w-full md:w-[200px] lg:w-[200px] cursor-pointer  px-3.5 py-4 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
          >
            <p className="text-[#FFFFFF] text-sm md:text-md">Create Job</p>
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      )}
      {jobsData &&
        jobsData.data?.map((item: any, index: number) => (
          <div key={index}>
            <JobListingCard
              itemId={item._id}
              imageUrl={item?.companyId?.avatarImage}
              title={item.jobTitle}
              companyName={item.companyId.companyName}
              createdTime={item.createdAt}
              level={item.experienceLevel}
              jobType={item.jobType}
              location={item.location}
            />
          </div>
        ))}
      <Modal show={showCreateJob} onClose={() => setShowCreateJob(false)}>
        <CreateJob userId={userId} token={token} />
      </Modal>
    </>
  );
}
