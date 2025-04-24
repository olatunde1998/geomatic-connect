import { shimmer, toBase64 } from "@/app/components/skeletons/Shimmer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
      <div className="cursor-pointer border border-slate-200 px-6 py-8 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 md:mt-16 rounded-2xl bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 8px rgb(255, 255, 255)",
          }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
        >
          <Image
            src={imageUrl}
            width={500}
            height={500}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
            alt="Blog Image"
            className="rounded-2xl max-h-64 object-cover"
          />
        </motion.div>
        <div>
          <p>
            <span>{createdAt}</span> <span>•</span>
            <span>{readTime}</span>
          </p>
          <p className="text-[#014751] font-semibold text-3xl my-6">
            {headings}
          </p>
          <p className="text-[#828282] text-lg">{content}</p>
          <p className="flex items-center gap-3 text-[#014751] text-base mt-8 cursor-pointer">
            Read article <ArrowRight className="size-4" />
          </p>
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
      <div className="cursor-pointer border border-slate-200 px-4 py-4 grid grid-cols-1 rounded-2xl bg-white h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 8px rgb(255, 255, 255)",
          }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
        >
          <Image
            src={imageUrl}
            width={500}
            height={500}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
            alt="Blog Image"
            className="rounded-2xl mb-3 max-h-40 object-cover"
          />
        </motion.div>
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
