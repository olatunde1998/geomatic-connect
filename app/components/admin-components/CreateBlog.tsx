import { formats, generateSlug, modules } from "@/utils/utils";
import { CreateBlogRequest } from "@/app/services/blog.request";
import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Plus } from "lucide-react";

type BlogData = {
  authorName: string;
  title: string;
  slug: string;
  subTitle: string;
  content: string;
  readTime: string;
};
export default function CreateBlog() {
  const [blogData, setBlogData] = useState<BlogData>({
    slug: "",
    authorName: "",
    title: "",
    subTitle: "",
    content: "",
    readTime: "7 min read",
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

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

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "geomatic-connect"); // from Cloudinary dashboard

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dgfjxhoae/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        const imageUrl = data.secure_url;

        // Insert the image into the editor
        const quill = quillInstance.current;
        const range = quill?.getSelection();
        if (range) {
          quill?.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    };
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

  // At the bottom of your CreateBlog component
  const handleSubmit = async () => {
    if (!blogData.title || !blogData.subTitle || !blogData.content) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const response = await CreateBlogRequest(blogData);
      console.log("Blog submitted!", response);
      alert("Blog created successfully!");
      setBlogData({
        slug: "",
        authorName: "",
        title: "",
        subTitle: "",
        content: "",
        readTime: "",
      });
      // quillRef.current?.root.innerHTML = "";
    } catch (err) {
      console.error(err, "this is error here===");
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 px-3 gap-4">
          {/* ========Blog Editor======== */}
          <div className="w-full max-w-3xl p-5 bg-white border border-gray-200 rounded-lg mx-auto">
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
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
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
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
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      placeholder="Type authorName here..."
                    />
                  </div>
                </div>
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
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      placeholder="Type the Course title"
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
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 "
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
                className="inline-flex items-center mt-4 sm:mt-6 text-sm text-center text-white rounded-[8px] cursor-pointer  px-3.5 py-3 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span>Create Blog Post</span>
              </button>
            </form>
          </div>

          {/*========Blog View======= */}
          <div className="w-full max-w-3xl p-7 bg-white border border-gray-200 rounded-lg mx-auto">
            <div className="flex items-center justify-between pb-2 mb-5 border-b border-gray-400">
              <h2 className="text-3xl font-bold">Blog View</h2>
              <div className="flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white w-[150px] cursor-pointer  px-2 py-3 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]">
                <p className="text-[#FFFFFF] text-sm md:text-md">Preveiw Blog</p>
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                  Blog Title
                </h2>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{blogData.title}</p>
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
    </>
  );
}
