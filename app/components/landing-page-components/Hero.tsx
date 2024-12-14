"use client";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import HeroImage from "@/public/images/hero.png"
// import HeroImage from "@/public/images/hero-6-remove.png"
import HeroImage from "@/public/images/hero-refine.png";
// import HeroImage from "@/public/images/hero-4-raw.jpg";

export default function Hero() {
  return (
    <>
      <main className="p-2 px-6 grid md:grid-cols-2 gap-10 items-center w-full">
        {/* ====Section One ==== */}
        <div className="mt-10">
          <p className="text-3xl xl:text-5xl font-extrabold text-[#014751] w-fit md:max-w-[500px]">
            Got Talent ? <br />
            Meet Opportunity
          </p>

          <div className="mt-12 rounded-3xl bg-[#FFFFFF] text-[#B3B3B3] flex justify-between items-center p-2.5">
            <div className="flex justify-between items-center">
              <Search />
              <input
                type="text"
                placeholder="Search Companies..."
                className="text-xs ml-3 line-clamp-1 w-[19ch] lg:w-[24ch] lg:line-clamp-none bg-transparent outline-none placeholder:text-[#B3B3B3] text-[#1A5962]"
              />
            </div>
            <div className="hidden lg:flex justify-between items-center">
              <div className="w-8 h-full border border-[#B3B3B3] rotate-90" />
              <div className="flex items-center justify-between">
                <MapPin size={24} />
                <input
                  type="text"
                  placeholder="All Locations"
                  className="text-xs w-full whitespace-nowrap bg-transparent outline-none placeholder:text-[#B3B3B3] text-[#1A5962]"
                />
              </div>
            </div>

            <Link
              href="/login"
              className="bg-[#1A5962] p-2.5 rounded-xl text-[#FFFFFF] w-20 text-center cursor-pointer"
            >
              Search
            </Link>
          </div>
        </div>

        {/* ====Section Two ==== */}
        <div className="flex items-center justify-center">
          <Image
            src={HeroImage}
            alt="Talent picture"
            width={500}
            height={500}
            priority
            className="relative z-100 xl:w-[557px] xl:h-[610px] object-cover mix-blend-multiply"
          />
        </div>
      </main>
    </>
  );
}
