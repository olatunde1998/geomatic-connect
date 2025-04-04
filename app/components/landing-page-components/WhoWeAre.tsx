import Link from "next/link";
import React from "react";
import { TbSitemap } from "react-icons/tb";
import { BsBarChart } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { GiArcheryTarget } from "react-icons/gi";

export default function WhoWeAre() {
  return (
    <main>
      <section className="grid md:grid-cols-2 md:gap-10 lg:gap-24">
        {/* ==== Section One ==== */}
        <div>
          <h2 className="capitalize text-2xl md:text-3xl font-bold text-[#014751] mt-10">
            Who we are?
          </h2>
          <div className="w-24 h-1 bg-[#FFC957]" />
          <div className="text-[#747578] max-w-[400px] mt-6 mb-10 md:my-10 leading-8 text-base ">
            <p className="text-sm leading-8 md:text-base md:leading-8">
              We are a company that prioritizes students satisfaction so that we
              can become a favorite company for all companies that use our
              services
            </p>
            <hr className="my-10 bg-[#014751] h-[2px]" />
            <div className="flex items-center justify-between gap-6 mb-16">
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-2xl md:text-3xl font-bold">10+</h3>
                <p className="text-xs md:text-sm text-center lg:whitespace-nowrap">
                  Project Completed
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-xs md:text-sm text-center lg:whitespace-nowrap">
                  Company work with
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-3xl font-bold">60+</h3>
                <p className="text-xs md:text-sm text-center lg:whitespace-nowrap">
                  Students connected
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:hover:bg-primary-foreground p-4 text-sm font-normal text-[#FFFFFF] rounded-md"
            >
              Create free account
            </Link>
          </div>
        </div>

        {/* ==== Steps Section ==== */}
        <div className="grid grid-cols-2 gap-4 xl:gap-6">
          <div className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <GiArcheryTarget size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Vision
            </p>
            <p className="font-light leading-6 dark:text-muted-foreground">
              Our vision is to be the leading platform connecting geomatic
              students with their preferred companies for industrial training,
              SIWES, and professional development.
            </p>
          </div>
          <div className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <TbSitemap size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Mission
            </p>
            <p className="font-light leading-6 dark:text-muted-foreground">
              We aim to deliver automation platforms that boost placement
              opportunities for geomatic students.
            </p>
          </div>
          <div className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <GoPeople size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Our Core Values
            </p>
            <p className="font-light leading-6 dark:text-muted-foreground">
              Students Focus, Innovation, Integrity & Respect.
            </p>
          </div>
          <div className="bg-[#F2F6F6] dark:hover:bg-muted  border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <BsBarChart size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Our Culture
            </p>
            <p className="font-light leading-6 dark:text-muted-foreground">
              At Geomatic Connect, we create solutions to boost geomatic student
              placements and contribute to national growth.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
