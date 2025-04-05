import { formats, generateSlug, modules } from "@/utils/utils";
import React, { useState } from "react";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Plus } from "lucide-react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  function handleTitle(e: any) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = generateSlug(newTitle);
    setSlug(autoSlug);
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    const newBlog = {
      title,
      slug,
      description,
      content,
    };
    console.log(newBlog);
  }
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 px-3 gap-4">
          {/* ========Blog Editor======== */}
          <div className="w-full max-w-3xl p-5 bg-white border border-gray-200 rounded-lg mx-auto">
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
              Blog Editor
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                  >
                    Blog Title
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleTitle}
                      type="text"
                      value={title}
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      placeholder="Type the Course title"
                    />
                  </div>
                </div>
                {/* Slug */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                  >
                    Blog Slug
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setSlug(e.target.value)}
                      type="text"
                      value={slug}
                      name="slug"
                      id="slug"
                      autoComplete="slug"
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      placeholder="Type the Course title"
                    />
                  </div>
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 "
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
                {/* Content */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Content
                  </label>
                  <>
                    {/* <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                    /> */}
                  </>
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
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
              Blog View
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                  Blog Title
                </h2>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{title}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                  Blog Slug
                </h2>
                <div className="mt-2">
                  <p>{slug}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Description
                </h2>
                <p>{description}</p>
              </div>
              <div className="sm:col-span-full">
                <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Content
                </h2>
                {parse(content)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
