"use client";
import { Facebook, Linkedin, Share2 } from "lucide-react";
import { jobListingData } from "@/utils/JobListingData";
import { useEffect, useRef, useState } from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { getShortTitle } from "@/utils/utils";
import { IoIosLink } from "react-icons/io";
import parse from "html-react-parser";
import { toast } from "sonner";
import Link from "next/link";

export default function JobDetails() {
  const [showActions, setShowActions] = useState(false);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Share dropdown Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shareText = jobListingData[0].jobTitle
    ? getShortTitle(jobListingData[0].jobTitle)
    : "Geomatic Connect Blog";

  const cleanPath = pathname.replace(/^\/admin-dashboard/, "");
  const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL}${cleanPath}`;
  const encodedUrl = encodeURIComponent(fullUrl);

  const jobDetailData = jobListingData[0];

  return (
    <div className="max-w-4xl mx-aut p-4 overflow-hidden border border-slate-300 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Job Details</h1>

      <header className="mt-8 border-b border-slate-300 pb-8">
        <h3 className="font-bold text-xl md:text-3xl">
          B2B Sales Representative - Earn Big with a Leading Brand
        </h3>
        <span className="text-base">at</span>
        <span className="text-muted-foreground ml-2 text-base">
          Super Speciosa
        </span>
        <p className="flex items-center flex-wrap gap-2 mt-2 text-base text-muted-foreground">
          <span className="font-semibold text-black/80">On-site</span>{" "}
          <span>. Oakland Park, Florida, United States</span>{" "}
          <span>. Full-time</span>
        </p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center justify-between">
          <p className="text-sm text-muted-foreground">Posted 4 days ago</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowActions((prevState) => !prevState)}
              className="relative cursor-pointer w-full md:w-fit"
            >
              <span className="px-3.5 py-2 flex items-center justify-center cursor-pointer gap-2 border text-sm border-slate-300 bg-white rounded-sm">
                <Share2 className="size-4" />
                Share
              </span>
              <span
                ref={shareRef}
                className={`${
                  showActions ? "block" : "hidden"
                } bg-white py-3 px-2 shadow-md rounded-lg text-sm border border-[#213f7d0f] w-[200px] space-y-2 absolute right-[-1px] lg:right-[-18px] z-[1] top-[50px]`}
              >
                <Link
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                  className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3  w-full"
                >
                  <RiTwitterXFill size={18} />
                  Share on X
                </Link>
                <Link
                  href={`https://www.linkedin.com/feed/?shareActive=true&shareUrl=${encodedUrl}`}
                  className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                >
                  <Linkedin size={18} />
                  Share on LinkedIn
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                >
                  <Facebook size={18} />
                  Share on Facebook
                </Link>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(decodeURIComponent(fullUrl));
                    toast.success("Link copied to clipboard!");
                  }}
                  className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                >
                  <IoIosLink size={18} />
                  Copy Link
                </span>
              </span>
            </button>
            <button className="w-full md:w-fit px-3.5 py-2 font-normal text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045] rounded-sm">
              Apply Now
            </button>
          </div>
        </div>
      </header>
      <section className="mt-8 sm:col-span-full">
        {typeof jobDetailData.description === "string" ? (
          parse(jobDetailData.description)
        ) : (
          <p>No content available</p>
        )}
      </section>
    </div>
  );
}
