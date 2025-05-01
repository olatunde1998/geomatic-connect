"use client";
import { BlogCard, BlogSmallCard } from "@/app/components/cards/BlogCard";
import { BlogSkeleton } from "@/app/components/skeletons/BlogSkeleton";
import { GetBlogsRequest } from "@/app/services/blog.request";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/utils";
import { useState } from "react";
import Link from "next/link";

export default function BlogHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const skeletonArray = [1, 2, 3, 4, 5, 6];

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["getBlogsApi", currentPage],
    queryFn: () => GetBlogsRequest(currentPage, limit),
  });

  return (
    <>
      <div className="pt-20 md:pt-20 lg:pt-10 xl:pt-2 px-6 lg:px-2 pb-20">
        <p className="w-full py-6 border-b border-slate-200">
          <span className="text-3xl">./</span>{" "}
          <span className="text-2xl">Blog</span> Insights for your job search
          journey
        </p>

        <section className="w-full max-w-5xl text-sm">
          {blogsData?.data?.[0] && (
            <Link href={`/company-dashboard/blog/${blogsData.data[0].slug}`}>
              <BlogCard
                headings={blogsData.data[0].title}
                content={blogsData.data[0].subTitle}
                imageUrl={blogsData.data[0].banner}
                createdAt={formatDate(blogsData.data[0].createdAt)}
                readTime={blogsData.data[0].readTime}
              />
            </Link>
          )}
          {isLoading ? (
            <div className="mt-10 space-y-6">
              {skeletonArray.map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 py-8 lg:px-6 rounded-2xl bg-white">
              {blogsData?.data?.map((item: any, index: number) => (
                <Link href={`/company-dashboard/blog/${item.slug}`} key={index}>
                  <BlogSmallCard
                    headings={item.title}
                    content={item.subTitle}
                    imageUrl={item.banner}
                    createdAt={formatDate(item.createdAt)}
                    readTime={item.readTime}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
