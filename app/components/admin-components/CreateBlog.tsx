import { formatDateShort, formats, generateSlug, modules } from "@/utils/utils";
import { CreateBlogRequest } from "@/app/services/blog.request";
import { LoaderCircle, Plus, Share2, Trash, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/app/components/modals/Modal";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Image from "next/image";

type BlogData = {
  slug: string;
  authorName: string;
  banner: string;
  title: string;
  subTitle: string;
  content: string;
  readTime: string;
};
export default function CreateBlog({
  setShowCreateBlog,
}: {
  setShowCreateBlog: any;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [blogData, setBlogData] = useState<BlogData>({
    slug: "",
    authorName: "",
    banner: "",
    title: "",
    subTitle: "",
    content: "",
    readTime: "3 min read",
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);
  const queryClient = useQueryClient();

  // Initialize Quill
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

      // Update content state on change
      quillInstance.current.on("text-change", () => {
        setBlogData((prev) => ({
          ...prev,
          content: quillInstance.current!.root.innerHTML,
        }));
      });
    }
  }, []);

  // Image upload handler
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        const quill = quillInstance.current;
        const range = quill?.getSelection();
        if (range) {
          quill?.insertEmbed(range.index, "image", base64);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // File Upload For  Banner logic
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      console.log(files[0].type, "this is the file type");

      const fileType = files[0].type;
      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "image/webp"
      ) {
        setUserImage(URL.createObjectURL(files[0]));
        setSelectedFile(file);
      } else {
        toast.error("Unsupported file type. Please upload a JPG, PNG, or JPEG");
      }
    }
  };

  // Handle title change and slug generation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setBlogData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  // CreateBlog Handler Logic
  const handleSubmit = async () => {
    if (
      !blogData.title ||
      !blogData.subTitle ||
      !blogData.content ||
      !selectedFile
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsCreating(true);

    // First upload the banner image
    let bannerUrl = "";
    if (selectedFile) {
      try {
        const bannerFormData = new FormData();
        bannerFormData.append("file", selectedFile);
        bannerFormData.append("upload_preset", "geomatic-connect");

        const bannerRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: bannerFormData,
          }
        );
        const bannerData = await bannerRes.json();
        bannerUrl = bannerData.secure_url;
      } catch (error) {
        toast.error("Failed to upload banner image");
        setIsCreating(false);
        return;
      }
    }

    // Parse the HTML content and update base64 images
    const parser = new DOMParser();
    const doc = parser.parseFromString(blogData.content, "text/html");
    const imgTags = doc.querySelectorAll("img");

    for (const img of imgTags) {
      const src = img.getAttribute("src");
      if (src?.startsWith("data:")) {
        const formData = new FormData();
        formData.append("file", src);
        formData.append("upload_preset", "geomatic-connect");

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          img.setAttribute("src", data.secure_url);
        } catch (error) {
          console.error("Failed to upload image to Cloudinary:", error);
        }
      }
    }

    // Serialize HTML back to string
    const updatedContent = doc.body.innerHTML;

    try {
      const response = await CreateBlogRequest({
        ...blogData,
        content: updatedContent,
        banner: bannerUrl,
      });
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["getBlogsApi"] });
      // Clear blog data
      setBlogData({
        slug: "",
        authorName: "",
        banner: "",
        title: "",
        subTitle: "",
        content: "",
        readTime: "3 min read",
      });
      setShowCreateBlog(false);
    } catch (err: any) {
      toast.error(err?.response.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 px-3 gap-4">
          {/* ========Blog Editor======== */}
          <div className="w-full max-w-3xl p-5 bg-white border border-gray-200 rounded-lg mx-auto">
            <h2 className="text-lg lg:text-2xl font-bold border-b border-gray-400 pb-2 mb-5 ">
              Blog Editor
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* ======authorName======= */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="authorName"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Author
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setBlogData({ ...blogData, authorName: e.target.value })
                      }
                      type="text"
                      value={blogData.authorName}
                      name="authorName"
                      id="authorName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border border-[#cbd5e1] py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-inset focus:ring-green-600 focus:ring-1 focus:outline-none  sm:text-sm sm:leading-6"
                      placeholder="Type Author Name here..."
                    />
                  </div>
                </div>

                {/* =====Blog Banner ===== */}
                <section className="sm:col-span-2">
                  <div className="border-[0.5px] border-slate-300 shadow-sm dark:border-muted px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-6 rounded-xl bg-white  mt-6">
                    <p className="text-sm font-medium flex items-center justify-between">
                      Blog Banner{" "}
                      {userImage && (
                        <Trash
                          onClick={() => setUserImage(undefined)}
                          className="size-4 text-red-400 cursor-pointer"
                        />
                      )}
                    </p>
                    <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white dark:bg-background rounded-2xl  border-[0.6px] border-slate-300 shadow-sm dark:border-muted mt-4 cursor-pointer">
                      <label
                        htmlFor="bannerInput"
                        className="w-full p-3 flex justify-between tracking-wide cursor-pointer"
                      >
                        {userImage ? (
                          <div className="rounded-xl relative mx-auto w-full">
                            <Image
                              src={userImage}
                              alt="Blog Banner"
                              width={100}
                              height={100}
                              className="rounded-xl w-full h-full max-h-40"
                            />
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-between gap-2">
                            <p className="w-full text-center">Upload image</p>
                            <input
                              type="file"
                              name="banner_Image"
                              id="bannerInput"
                              accept=".png,  .jpg, .jpeg, .webp"
                              className="hidden input-field"
                              onChange={handleFileChange}
                            />
                            <div className="border-slate-800 border-[1.3px] border-dashed rounded-full relative mx-auto flex items-center justify-center w-[45px] h-[45px]">
                              <Upload
                                size={24}
                                className="rounded-full w-[45px] h-[24px]"
                              />
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </section>

                {/* ======Title======= */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                  >
                    Blog Title
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleTitleChange}
                      type="text"
                      value={blogData.title}
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      className="block w-full rounded-md border border-[#cbd5e1] py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-inset focus:ring-green-600 focus:ring-1 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="Type the Course title"
                    />
                  </div>
                </div>
                {/* =====Slug===== */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                  >
                    Blog Slug
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={blogData.slug}
                      name="slug"
                      id="slug"
                      autoComplete="slug"
                      readOnly
                      className="block w-full rounded-md bg-slate-100 cursor-not-allowed border border-[#cbd5e1] py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="blug--slug"
                    />
                  </div>
                </div>
                {/* ===== SubTitle ====== */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="subTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Description
                  </label>
                  <textarea
                    id="subTitle"
                    name="subTitle"
                    rows={4}
                    onChange={(e) =>
                      setBlogData({ ...blogData, subTitle: e.target.value })
                    }
                    value={blogData.subTitle}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-inset focus:ring-green-600 focus:ring-1 focus:outline-none "
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
                {/* ====== Content ===== */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Content
                  </label>
                  <div ref={editorRef} style={{ height: "200px" }} />
                </div>
              </div>
              <button
                type="submit"
                disabled={isCreating}
                className="flex justify-center items-center gap-1 mt-4 sm:mt-6 text-sm text-center text-white rounded-[8px] cursor-pointer  px-3.5 py-3 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
              >
                {isCreating ? (
                  <>
                    <LoaderCircle
                      style={{ animationDuration: "0.4s" }}
                      className="size-4 animate-spin mx-auto"
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Blog Post
                  </>
                )}
              </button>
            </form>
          </div>

          {/*========Blog View======= */}
          <div className="w-full max-w-3xl p-7 bg-white border border-gray-200 rounded-lg mx-auto">
            <div className="flex items-center justify-between pb-2 mb-5 border-b border-gray-400">
              <h2 className="text-lg lg:text-2xl font-bold">Blog View</h2>
              <div
                onClick={() => setShowPreview(true)}
                className="flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white w-[120px] md:w-[150px] lg:w-[120px] cursor-pointer  px-2 py-3 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
              >
                <p className="text-[#FFFFFF] text-sm md:text-md">
                  Preveiw Blog
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                  Blog Title
                </h2>
                <div className="mt-2">
                  <p className="text-xl font-bold">{blogData.title}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                  Blog Slug
                </h2>
                <div className="mt-2">
                  <p>{blogData.slug}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Description
                </h2>
                <p>{blogData.subTitle}</p>
              </div>
              <div className="sm:col-span-full">
                <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Content
                </h2>
                {parse(blogData.content)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showPreview} onClose={() => setShowPreview(false)}>
        <div className="w-full md:w-[672px] lg:w-[768px] p-7 bg-white border border-gray-200 rounded-lg">
          <h2 className="flex justify-between text-2xl lg:text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog View
            <X
              onClick={() => setShowPreview(false)}
              className="hover:bg-slate-100 cursor-pointer h-fit w-fit p-1.5 rounded-md"
            />
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <p>{formatDateShort(new Date().toISOString())}</p>
              <div className="text-base w-1 h-1 rounded-full bg-slate-300" />
              <p className="underline text-blue-400"> {blogData?.authorName}</p>
            </div>
            <div className="cursor-pointer">
              <p className="flex items-center cursor-pointer gap-2 border text-sm border-slate-200 bg-white rounded-2xl px-3 py-1">
                <Share2 className="size-4" />
                Share
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                {blogData?.title}
              </h2>
            </div>
            <div className="sm:col-span-2">
              <p>{blogData?.subTitle}</p>
            </div>
            <div className="sm:col-span-full">
              {typeof blogData?.content === "string" ? (
                parse(blogData.content)
              ) : (
                <p>No content available</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
