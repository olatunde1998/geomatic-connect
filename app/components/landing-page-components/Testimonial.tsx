"use client";
import Image from "next/image";
import TestimonialCard from "@/app/components/cards/TestimonialCard";
import Google from "@/public/images/google-2.png";
import Facebook from "@/public/images/facebook.png";
import TrustPilot from "@/public/images/trustpilot.png";

export default function Testimonial() {
  return (
    <>
      <main className="py-14 px-6 xl:py-20 w-full">
        {/* ====Section One ==== */}
        <div className="text-center">
          <p className="text-xl  font-extrabold md:text-3xl xl:text-4xl text-[#014751]">
            Testimonials
          </p>
          <p className="text-md md:text-base lg:text-lg w-[250px] lg:w-[300px] mx-auto mt-3">
            What Do Happy Clients Say About Working With Us?
          </p>
        </div>
        {/* ====Section Two ==== */}
        <section>
          <div className="mx-auto mt-16 flex gap-3 xl:gap-6">
            <div className="w-full relative overflow-hidden">
              <div className="relative gap-6 flex items-center justify-center animate md:relative left-0 ">
                {/* part one */}
                <div className="gap-6 flex items-center justify-around">
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                </div>
                {/* part two */}
                <div className="gap-6 flex items-center justify-around">
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-10 justify-center gap-3 xl:gap-24 opacity-30">
            <Image
              src={Google}
              alt="google image"
              width={100}
              height={100}
              priority
              className="w-[79px] h-[30px] lg:w-[158px] lg:h-[60px] object-cover"
            />
            <Image
              src={Facebook}
              alt="facebook image"
              width={100}
              height={100}
              priority
              className="w-[73px] h-[32px] lg:w-[145px] lg:h-[63px] object-cover"
            />
            <Image
              src={TrustPilot}
              alt="trust pilot image"
              width={100}
              height={100}
              priority
              className="w-[79px] h-[36px] lg:w-[158px] lg:h-[71px] object-cover"
            />
          </div>
        </section>
      </main>
    </>
  );
}
