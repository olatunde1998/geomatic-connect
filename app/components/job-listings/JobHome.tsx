"use client";
import { JobSkeleton } from "@/app/components/skeletons/JobSkeleton";
import JobListingCard from "@/app/components/cards/JobListingCard";
import CreateJob from "@/app/components/job-listings/CreateJob";
import { GetjobsRequest } from "@/app/services/job.request";
import { Modal } from "@/app/components/modals/Modal";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function JobHome() {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const skeletonArray = [1, 2, 3, 4, 5];
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["getJobsApi", currentPage],
    queryFn: () => GetjobsRequest(token, currentPage, limit),
  });

  return (
    <>
      {isLoading
        ? skeletonArray.map((item, index) => (
            <div key={index}>
              <JobSkeleton />
            </div>
          ))
        : jobsData?.data?.map((item: any, index: number) => (
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
        <CreateJob token={token} setShowCreateJob={setShowCreateJob} />
      </Modal>
    </>
  );
}
