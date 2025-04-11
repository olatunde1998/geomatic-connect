"use client";
import { ArrowLeft, Facebook, Linkedin, Share2 } from "lucide-react";
import { GetBlogRequest } from "@/app/services/blog.request";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiTwitterXFill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import parse from "html-react-parser";
import EditBlog from "./EditBlog";
import Link from "next/link";

interface BlogDetailsProps {
  blogSlug?: string;
  token?: any;
}

export default function BlogDetails({ blogSlug, token }: BlogDetailsProps) {
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const { data: blogDetailData } = useQuery({
    queryKey: ["getSingleBlogApi"],
    queryFn: () => GetBlogRequest(blogSlug),
  });

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

  return (
    <>
      <div className="rounded-lg mt-20 mb-10 md:mt-24 lg:mt-20 xl:my-10 items-center justify-between bg-[#ECF1F7] flex p-2 px-6 gap-3">
        <div
          onClick={() => router.back()}
          className="cursor-pointer hover:text-[#014751] hover:border-[#014751] hover:border rounded-2xl flex items-center gap-2 border border-slate-300 w-fit p-1.5 px-3 text-sm"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </div>
      </div>
      {/* ================Body section ===========  */}
      {showEditBlog ? (
        <EditBlog blogDetailData={blogDetailData} token={token} />
      ) : (
        <section className="mt-8">
          {/*========Blog View======= */}
          <div className="w-full max-w-3xl p-7 bg-white border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-5">
              <h2 className="text-3xl font-bold ">Blog View</h2>
              {pathname.includes("/admin-dashboard") && (
                <p
                  onClick={() => setShowEditBlog((prev) => !prev)}
                  className="cursor-pointer p-3"
                >
                  Edit
                </p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <p>Feb 5, 2025</p>{" "}
                <div className="text-base w-1 h-1 rounded-full bg-slate-300" />
                <Link href="#" className="underline text-blue-400">
                  {blogDetailData?.data?.authorName}
                </Link>
              </div>
              <div
                onClick={() => setShowActions((prevState) => !prevState)}
                className="relative cursor-pointer"
              >
                <p className="flex items-center cursor-pointer gap-2 border text-sm border-slate-200 bg-white rounded-2xl px-3 py-1">
                  <Share2 className="size-4" />
                  Share
                </p>
                <div
                  ref={shareRef}
                  className={`${
                    showActions === true ? "block" : "hidden"
                  } bg-white py-3 px-2 shadow-md rounded-lg text-sm border border-[#213f7d0f] w-[200px] space-y-2 absolute right-[-1px] lg:right-[-18px] z-[1] top-[50px]`}
                >
                  <Link
                    href="#"
                    className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3  w-full"
                  >
                    <RiTwitterXFill size={18} />
                    Share on X
                  </Link>
                  <Link
                    href="#"
                    className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                  >
                    <Linkedin size={18} />
                    Share on LinkedIn
                  </Link>
                  <Link
                    href="#"
                    className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                  >
                    <Facebook size={18} />
                    Share on Facebook
                  </Link>
                  <Link
                    href="#"
                    className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                  >
                    <IoIosLink size={18} />
                    Copy Link
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {blogDetailData?.data?.title}
                </h2>
              </div>
              <div className="sm:col-span-2">
                <p>{blogDetailData?.data?.subTitle}</p>
              </div>
              <div className="sm:col-span-full">
                {typeof blogDetailData?.data?.content === "string" ? (
                  parse(blogDetailData.data.content)
                ) : (
                  <p>No content available</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
