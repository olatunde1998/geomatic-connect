import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  headings: string;
  imageUrl: any;
  content: string;
  createdAt: string;
  readTime: string;
}

interface BlogSmallCardProps {
  headings: string;
  imageUrl: any;
  content: string;
  createdAt: string;
  readTime: string;
}

export function BlogCard({
  headings,
  content,
  imageUrl,
  createdAt,
  readTime,
}: BlogCardProps) {
  return (
    <>
      <div>
        <div className="border border-slate-200 px-6 py-8 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 md:mt-16 rounded-2xl bg-white">
          <div>
            <Image
              src={imageUrl}
              width={500}
              height={500}
              priority
              placeholder="blur"
              alt="Blog Image"
              className="rounded-2xl"
            />
          </div>
          <div>
            <p>
              <span>{createdAt}</span> <span>•</span>
              <span>{readTime}</span>
            </p>
            <p className="text-[#014751] font-semibold text-3xl my-6">
              {/* How to Land a High-Paying Remote Job */}
              {headings}
            </p>
            <p className="text-[#828282] text-lg">{content}</p>
            <p className="flex items-center gap-3 text-[#014751] text-base mt-8 cursor-pointer">
              Read article <ArrowRight className="size-4" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function BlogSmallCard({
  headings,
  content,
  imageUrl,
  createdAt,
  readTime,
}: BlogSmallCardProps) {
  return (
    <>
      <div className="border border-slate-200 px-4 py-4 grid grid-cols-1 rounded-2xl bg-white h-full">
        <div>
          <Image
            src={imageUrl}
            width={500}
            height={500}
            priority
            placeholder="blur"
            alt="Blog Image"
            className="rounded-2xl mb-3"
          />
        </div>
        <div className="grid grid-cols-1  mt-3">
          <p>
            <span>{createdAt}</span> <span>•</span>
            <span>{readTime}</span>
          </p>
          <p className="text-[#014751] font-semibold text-xl my-3">
            {headings}
          </p>
          <p className="text-[#828282] text-base truncate-2">
            {content.split(" ").slice(0, 15).join(" ")}...
          </p>
          <p className="flex items-center gap-3 text-[#014751] text-base mt-4 cursor-pointer">
            Read article <ArrowRight className="size-4" />
          </p>
        </div>
      </div>
    </>
  );
}
