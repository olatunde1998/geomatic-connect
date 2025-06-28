"use client";
import { jobListingData } from "@/utils/JobListingData";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function JobListingCard() {
  const pathname = usePathname();
  return (
    <>
      {jobListingData.map((item, index) => (
        <Link
          href={`${pathname}/${item.id}`}
          key={index}
          className="border border-slate-300 p-4 rounded-xl mb-5 block"
        >
          <section className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <Image
                src={item.imageUrl}
                alt="company brand logo"
                width={100}
                height={100}
                className="w-[70px] h-[70px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full object-cover"
              />
              <div>
                <p className="font-semibold ">{item.jobTitle}</p>
                <p className="text-gray-500">{item.companyName}</p>
              </div>
            </div>
            <p className="bg-slate-400 text-white h-fit py-1 px-4 rounded-lg text-xs">
              {item.datePosted}
            </p>
          </section>
          <section className="flex gap-4 items-center mt-3">
            {item.requirements.map((requirement, index) => (
              <span
                key={index}
                className="border border-slate-300 px-4 py-1 rounded-lg text-sm"
              >
                {requirement}
              </span>
            ))}
          </section>
        </Link>
      ))}
    </>
  );
}
