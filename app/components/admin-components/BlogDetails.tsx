"use client";
import {
  ArrowLeft,
  Facebook,
  Linkedin,
  LoaderCircle,
  Share2,
} from "lucide-react";
import { DeleteBlogRequest, GetBlogRequest } from "@/app/services/blog.request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDateShort, getShortTitle } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";
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
  const [isDeleting, setIsDeleting] = useState(false);

  const shareRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data: blogDetailData, isLoading } = useQuery({
    queryKey: ["getSingleBlogApi"],
    queryFn: () => GetBlogRequest(blogSlug),
  });
  const blogId = blogDetailData?.data?._id;
  
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

  const shareText = blogDetailData?.data?.title
    ? getShortTitle(blogDetailData.data.title)
    : "Geomatic Connect Blog";

  const cleanPath = pathname.replace(/^\/admin-dashboard/, "");
  const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL}${cleanPath}`;
  const encodedUrl = encodeURIComponent(fullUrl);

  // Delete A Blog Request Logic
  const deleteBlogHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteBlogRequest(blogId, token);
      await queryClient.invalidateQueries({
        queryKey: ["getBlogsApi"],
      });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

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
        <EditBlog
          blogDetailData={blogDetailData}
          token={token}
          setShowEditBlog={setShowEditBlog}
        />
      ) : (
        <section className="mt-8">
          {isLoading ? (
            <div className="pt-[80px] pb-[150px]">
              <LoaderCircle className="size-12 animate-spin duration-500 mx-auto mt-8" />
            </div>
          ) : (
            <>
              {/*========Blog View======= */}
              <div className="w-full max-w-3xl p-7 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-5">
                  <h2 className="text-xl font-bold ">Geomatic Blog</h2>
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
                    <p>{formatDateShort(blogDetailData?.data?.createdAt)}</p>
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
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(
                            decodeURIComponent(fullUrl)
                          );
                          toast.success("Link copied to clipboard!");
                        }}
                        className="rounded-xl hover:bg-gray-100 hover:text-[#014751] text-gray-600 flex items-center gap-x-2 cursor-pointer p-2 pl-3 w-full"
                      >
                        <IoIosLink size={18} />
                        Copy Link
                      </div>
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
              {pathname.includes("/admin-dashboard") && (
                <button
                  onClick={() => deleteBlogHandler()}
                  disabled={isDeleting}
                  className="flex p-2 mt-8 md:p-3 justify-center items-center gap-[8px] text-white w-[120px] md:w-[150px] lg:w-[120px] cursor-pointer  px-2 py-3 font-light shadow-sm bg-gradient-to-r from-[#D92D20] to-[#F97316] rounded-sm"
                >
                  <span className="text-[#FFFFFF] text-sm md:text-md">
                    {isDeleting ? "Deleting...." : "Delete Blog"}
                  </span>
                </button>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}
