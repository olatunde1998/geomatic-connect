"use client";
import ReactPlayer from "react-player";
import Link from "next/link";

export default function ConnectServices() {
  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <main className="w-full md:grid md:grid-cols-2 md:place-content-between md:gap-8">
        <div>
          <div className="text-[#FFFFFF] lg:mt-12 px-4">
            <p className="text-xl text-cente md:text-left font-bold md:text-2xl lg:text-3xl xl:text-4xl w-[250px] md:w-[100%]">
              We&apos;re Providing the Best Connection Services
            </p>
            <p className="mt-4  md:text-left md:mt-4 text-xs md:text-base text-[#F0F0F0] lg:w-[500px]">
              Make a type specimen book. It has survived not only five
              centuries, but also the leap into.
            </p>
            <div className="mt-10 flex space-x-2 mb-8">
              <button
                onClick={() => handleSmoothScroll("contactUs-id")}
                className="hover:bg-[#014751] border-[1.3px] border-[#FFFFFF] p-3 lg:p-4 font-bold text-[#FFFFFF] rounded-md w-[100px] lg:w-[150px] text-xs"
              >
                Contact Us
              </button>
              <Link
                href="/signup"
                className="bg-[#014751] p-3 lg:p-4 font-bold text-[#FFFFFF] rounded-md w-[150px] text-xs"
              >
                Register an account
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full h-fit mt-12 lg:mt-8 flex items-center justify-center">
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            className=""
            url="../../../videos/demo-video.mp4"
          />
        </div>
      </main>
    </>
  );
}
