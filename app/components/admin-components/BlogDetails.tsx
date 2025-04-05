"use client";
import { GetBlogRequest } from "@/app/services/blog.request";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

interface BlogDetailsProps {
  blogId?: any;
}

export default function BlogDetails({ blogId }: BlogDetailsProps) {
  const router = useRouter();

  const { data: blogDetailData } = useQuery({
    queryKey: ["getSingleBlogApi"],
    queryFn: () => GetBlogRequest(blogId),
  });

  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] dark:bg-muted flex p-2 gap-3  lg:my-20 xl:my-10">
        <div className="flex items-center">
          <p
            onClick={() => router.back()}
            className="py-2 cursor-pointer text-base md:text-xl font-bold text-gray-400"
          >
            Blog
          </p>
          <ChevronRight size={24} className="mx-0.5" />
          <p className="py-2 cursor-text text-base  md:text-xl font-bold">
            Blog Details
          </p>
        </div>
      </div>
      {/* ================Body section ===========  */}
      <section className="mt-8">
        {/*========Blog View======= */}
        <div className="w-full max-w-3xl p-7 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog View
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                Blog Title
              </h2>
              <div className="mt-2">
                <p className="text-2xl font-bold">
                  {blogDetailData?.data?.title}
                </p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Blog Description
              </h2>
              <p>{blogDetailData?.data?.subTitle}</p>
            </div>
            <div className="sm:col-span-full">
              <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Blog Content
              </h2>
              {typeof blogDetailData?.data?.content === "string" ? (
                parse(blogDetailData.data.content)
              ) : (
                <p>No content available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
