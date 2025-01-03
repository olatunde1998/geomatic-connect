"use client";
import Image from "next/image";
import Contact from "@/public/images/contact.png";

export default function ContactUs() {
  return (
    <>
      <main className="px-3 lg:px-6 w-full grid grid-cols-2 lg:flex lg:gap-10 xl:gap-0">
        {/* ====Section One ==== */}
        <section className="mt-8">
          <div className="lg:w-[400px]">
            <Image
              src={Contact}
              alt="Contact us picture"
              width={500}
              height={500}
              priority
              className="w-[200px] h-[200px] object-contain lg:object-cover md:w-[430px] md:h-[270px]"
            />
          </div>
        </section>

        {/* ====Section Two ==== */}
        <section className="xl:flex mt-8 md:mt-10 lg:mt-20 ">
          <div className="text-base  font-bold lg:text-2xl xl:text-3xl text-[#014751] md:mt-3 md:w-[300px]">
            We&apos;ll Connect You With in 48hours.
          </div>
          <div className="lg:flex  gap-3  h-fit mt-6 xl:ml-28">
            <p className="p-3 lg:p-4 bg-[#014751] text-[#FFFFFF] rounded-xl w-[150px] md:w-[180px] text-center flex items-center justify-center cursor-pointer text-sm">
              Contact Us
            </p>
            <p className="p-3 lg:p-4 mt-2 md:mt-3 lg:mt-0 bg-[#FFFFFF] text-xs border-[1.3px] border-[#014751] text-[#014751] rounded-xl w-[150px] md:w-[180px] text-center flex items-center justify-center font-semibold cursor-pointer">
              Register Now
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
