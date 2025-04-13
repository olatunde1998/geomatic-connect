"use client";
import { BlogCard, BlogSmallCard } from "@/app/components/cards/BlogCard";
import { GetBlogsRequest } from "@/app/services/blog.request";
import GetStarted from "@/public/images/get-started.webp";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Plus } from "lucide-react";
import { formatDate } from "@/utils/utils";
import CreateBlog from "./CreateBlog";
import { useState } from "react";
import Link from "next/link";

interface BlogHomeProps {
  token: any;
}
export default function BlogHome({ token }: BlogHomeProps) {
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["getBlogsApi", currentPage],
    queryFn: () => GetBlogsRequest(currentPage, limit),
  });

  return (
    <>
      <main className="flex min-h-screen flex-col pt-24 lg:pt-32">
        <div className="pb-20">
          <div className="border-b border-slate-200 md:flex items-center justify-between">
            <p className="text-sm">
              <span className="text-3xl">./</span>{" "}
              <span className="text-2xl">Blog</span> Insights for your job
              search journey
            </p>
            <div onClick={() => setShowCreateBlog((prev) => !prev)}>
              {showCreateBlog ? (
                <div className="my-4 flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white w-full md:w-[150px] cursor-pointer  px-3.5 py-4 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[#FFFFFF] text-sm md:text-md">
                    Back to Blog
                  </p>
                </div>
              ) : (
                <div className="my-4 flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white w-full md:w-[150px] cursor-pointer  px-3.5 py-4 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]">
                  <p className="text-[#FFFFFF] text-sm md:text-md">
                    Create Blog
                  </p>
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              )}
            </div>
          </div>

          {showCreateBlog ? (
            <div className="mt-8 rounded-2xl bg-white border border-slate-200">
              <CreateBlog setShowCreateBlog={setShowCreateBlog} />
            </div>
          ) : (
            <section className="w-full max-w-5xl text-sm">
              <Link
                href={`/admin-dashboard/blog/how-to-land-a-high-paying-remote-job`}
              >
                <BlogCard
                  headings="How to Land a High-Paying Remote Job"
                  content="Learn the top strategies for landing a high-paying remote job that you actually love."
                  imageUrl={GetStarted}
                  createdAt="February 18, 2025"
                  readTime="7 min read"
                />
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 py-8 px-6 rounded-2xl bg-white">
                {blogsData?.data?.map((item: any, index: number) => (
                  <Link href={`/admin-dashboard/blog/${item.slug}`} key={index}>
                    <BlogSmallCard
                      headings={item.title}
                      content={item.subTitle}
                      imageUrl={GetStarted}
                      createdAt={formatDate(item.createdAt)}
                      readTime={item.readTime}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
