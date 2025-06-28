"use client";
import Applicants from "@/app/components/job-listings/Applicants";
import EditJob from "@/app/components/job-listings/EditJob";
import { Modal } from "@/app/components/modals/Modal";
import { jobListingData } from "@/utils/JobListingData";
import { Rss, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function JobDetailsPage() {
  const [showEditJob, setShowEditJob] = useState(false);
  const jobDetails = jobListingData[0];
  return (
    <>
      <div className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
        <section>
          <div className="border border-slate-300 p-4 rounded-xl mb-5 block">
            <section className="flex items-start justify-between">
              <div className="flex gap-3 items-center">
                <Image
                  src={jobDetails.imageUrl}
                  alt="company brand logo"
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold ">{jobDetails.jobTitle}</p>
                  <p className="text-gray-500">{jobDetails.companyName}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p
                  onClick={() => setShowEditJob(true)}
                  className="cursor-pointer bg-slate-400 text-white h-fit py-1.5 px-4 rounded-lg text-xs flex items-center gap-2"
                >
                  <SquarePen className="size-4" /> Edit
                </p>
                <p className="cursor-pointer bg-slate-400 text-white h-fit py-1.5 px-4 rounded-lg text-xs flex items-center gap-2">
                  <Rss className="size-4" /> Publish
                </p>
                <p className="cursor-pointer bg-red-500 text-white h-fit py-1.5 px-4 rounded-lg text-xs flex items-center gap-2">
                  <Trash2 className="size-4" /> Delete
                </p>
              </div>
            </section>
            <section className="flex gap-4 items-center mt-3">
              {jobDetails.requirements.map((requirement, index) => (
                <span
                  key={index}
                  className="border border-slate-300 px-4 py-1 rounded-lg text-sm"
                >
                  {requirement}
                </span>
              ))}
            </section>
          </div>
        </section>
        <section>
          <Applicants />
        </section>
      </div>
      <Modal show={showEditJob} onClose={() => setShowEditJob(false)}>
        <EditJob />
      </Modal>
    </>
  );
}
