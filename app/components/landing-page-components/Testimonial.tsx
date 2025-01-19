"use client";
import Image from "next/image";
import TestimonialCard from "@/app/components/cards/TestimonialCard";
import Google from "@/public/images/google-2.png";
import Facebook from "@/public/images/facebook.png";
import TrustPilot from "@/public/images/trustpilot.png";
import RasheedPic from "@/public/images/student-pic.jpeg";
import AdaezePic from "@/public/images/adaeze-img.jpeg";
import MustophaPic from "@/public/images/mustopha-img.jpeg";
import DamilarePic from "@/public/images/damilare-img.jpg";


export default function Testimonial() {
  return (
    <>
      <main className="py-14 px-6 xl:py-20 w-full">
        {/* ====Section One ==== */}
        <div className="text-center">
          <p className="text-2xl font-extrabold md:text-3xl xl:text-4xl text-[#014751]">
            Testimonials
          </p>
          <p className="text-base md:text-base text-[#747578] lg:text-lg w-[250px] lg:w-[300px] mx-auto mt-3">
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
                  <TestimonialCard
                    imageUrl={RasheedPic}
                    location="UI Ibadan, Oyo State"
                    fullName="Rasheed Olatunde"
                  />
                  <TestimonialCard
                    imageUrl={AdaezePic}
                    location="Victoria Island, Lagos State"
                    fullName="Adaeze Ugwu"
                  />
                  <TestimonialCard
                    imageUrl={MustophaPic}
                    location="Sango Ota, Ogun State"
                    fullName="Mustopha Iyiola"
                  />
                  <TestimonialCard
                    imageUrl={DamilarePic}
                    location="Ede, Osun State"
                    fullName="Damilare Adekilekun"
                  />
                </div>
                {/* part two */}
                <div className="gap-6 flex items-center justify-around">
                  <TestimonialCard
                    imageUrl={RasheedPic}
                    location="UI Ibadan, Oyo State"
                    fullName="Rasheed Olatunde"
                  />
                  <TestimonialCard
                    imageUrl={AdaezePic}
                    location="Victoria Island, Lagos State"
                    fullName="Adaeze Ugwu"
                  />
                  <TestimonialCard
                    imageUrl={MustophaPic}
                    location="Sango Ota, Ogun State"
                    fullName="Mustopha Iyiola"
                  />
                  <TestimonialCard
                    imageUrl={DamilarePic}
                    location="Ede, Osun State"
                    fullName="Damilare Adekilekun"
                  />
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
