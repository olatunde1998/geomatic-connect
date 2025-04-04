"use client";
import ReactPlayer from "react-player";
import Link from "next/link";
import { Check } from "lucide-react";

export default function HowItWorks() {
  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <main className="w-full md:grid md:grid-cols-2 md:gap-32">
        <div className="text-[#FFFFFF] lg:mt-10">
          <p className="text-2xl md:text-left font-bold md:text-3xl xl:text-4xl w-[250px] md:w-[100%]">
            How it works?
          </p>
          <div className="w-24 h-1 bg-[#FFC957]" />
          <p className="mt-4 md:text-left  text-xs md:text-base font-light text-[#F0F0F0] lg:w-[500px] my-10 !leading-10">
            Watch the video to learn how to submit requests to your desired
            companies using Geomatic Connect. Discover how to navigate and make
            the most of the application&apos;s features.
          </p>
          <p className="mt-4 flex items-center font-light gap-2 md:text-left text-sm text-[#F0F0F0] lg:w-[500px]">
            <Check color="#6CB92B" />
            Create Your Free Account with us
          </p>
          <p className="mt-4 flex items-center font-light gap-2 md:text-left text-sm text-[#F0F0F0] lg:w-[500px]">
            <Check color="#6CB92B" />
            Verify Your Email Address
          </p>{" "}
          <p className="mt-4 flex items-center font-light gap-2 md:text-left text-sm text-[#F0F0F0] lg:w-[500px]">
            <Check color="#6CB92B" />
            Login with your Free Account
          </p>
          <p className="mt-4 flex items-center font-light gap-2 md:text-left text-sm text-[#F0F0F0] lg:w-[500px]">
            <Check color="#6CB92B" />
            Make Request to your desire Company
          </p>
          <div className="mt-10 flex space-x-6 mb-8">
            <button
              onClick={() => handleSmoothScroll("contactUs-id")}
              className="dark:bg-muted dark:hover:bg-background dark:border-muted-foreground dark:border-[0.2px] hover:bg-[#014751] border-[1.3px] shadow-xl border-[#FFFFFF] p-3 lg:p-4 font-bold text-[#FFFFFF] rounded-md w-[130px] lg:w-[150px] text-xs"
            >
              Contact Us
            </button>
            <Link
              href="/signup"
              className="border-[#6CB92B] border-[1.3px] shadow-xl bg-[#FFFFFF] p-3 lg:p-3 items-center flex justify-center font-bold text-[#014751] rounded-md w-[150px] text-xs"
            >
              Create free account
            </Link>
          </div>
        </div>

        <div className="w-full h-fit md:h-[350px] lg:w-[400px] xl:w-[550px] xl:h-[350px] mt-12 lg:mt-16">
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            url="https://res.cloudinary.com/dgfjxhoae/video/upload/v1737481250/geomatic-connect/geomatic-demo-veed_vrlz1o.mp4"
          />
        </div>
      </main>
    </>
  );
}
