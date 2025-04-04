import GetStarted from "@/public/images/get-started.webp";
import { BlogCard, BlogSmallCard } from "@/app/components/cards/BlogCard";
import { blogData } from "@/utils/BlogData";

export default function BlogHome() {
  return (
    <div className="px-6 pb-20">
      <p className="w-full py-6 border-b border-slate-200">
        <span className="text-3xl">./</span>{" "}
        <span className="text-2xl">Blog</span> Insights for your job search
        journey
      </p>
      <BlogCard
        headings="How to Land a High-Paying Remote Job"
        content="Learn the top strategies for landing a high-paying remote job that you actually love."
        imageUrl={GetStarted}
        createdAt="February 18, 2025"
        readTime="7 min read"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 py-8 px-6 rounded-2xl bg-white">
        {blogData.map((item, index) => (
          <div key={index}>
            <BlogSmallCard
              headings={item.headings}
              content={item.content}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
              readTime={item.readTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
