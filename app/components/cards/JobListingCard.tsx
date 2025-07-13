"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

interface JobsDataProps {
  itemId: string;
  imageUrl: string;
  title: string;
  companyName: string;
  createdTime: string;
  level: string;
  jobType: string;
  location: string;
}

export default function JobListingCard({
  itemId,
  imageUrl,
  title,
  companyName,
  createdTime,
  level,
  jobType,
  location,
}: JobsDataProps) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={`${pathname}/${itemId}`}
        className="border border-slate-300 dark:border-muted p-4 rounded-xl mb-5 block hover:bg-slate-100 dark:hover:bg-muted"
      >
        <section className="flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <Image
              src={imageUrl}
              alt="company brand logo"
              width={100}
              height={100}
              className="w-[70px] h-[70px] border-[1.3px] border-slate-200 dark:border-muted items-center justify-center flex rounded-full object-cover"
            />
            <div>
              <p className="font-semibold  truncate text-wrap">{title}</p>
              <p className="text-gray-500 dark:text-muted-foreground truncate text-wrap">{companyName}</p>
            </div>
          </div>
          <p className="bg-slate-400 dark:bg-muted text-white h-fit py-1 px-4 rounded-lg text-xs">
            {dayjs(createdTime).format("MMM D, YYYY")}
          </p>
        </section>
        <section className="flex flex-wrap gap-4 items-center mt-3">
          <span className="border border-slate-300 dark:border-muted-foreground dark:text-muted-foreground px-4 py-1 rounded-lg text-sm">
            Featured
          </span>
          <span className="border border-slate-300 dark:border-muted-foreground dark:text-muted-foreground px-4 py-1 rounded-lg text-sm">
            {level}
          </span>
          <span className="border border-slate-300 dark:border-muted-foreground dark:text-muted-foreground px-4 py-1 rounded-lg text-sm">
            {jobType}
          </span>
          <span className="border border-slate-300 dark:border-muted-foreground dark:text-muted-foreground px-4 py-1 rounded-lg text-sm">
            {location}
          </span>
        </section>
      </Link>
    </>
  );
}
