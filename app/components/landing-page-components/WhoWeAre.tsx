"use client";
import Link from "next/link";
import React from "react";

export default function WhoWeAre() {
  return (
    <main>
      <section className="grid md:grid-cols-2 md:gap-10 lg:gap-24">
        {/* ==== Section One ==== */}
        <div>
          <h2 className="capitalize text-3xl font-bold text-[#014751] mt-16">
            Who we are?
          </h2>
          <div className="w-24 h-1 bg-[#FFC957]" />
          <div className="text-[#747578] max-w-[400px] my-10 leading-8 text-base ">
            <p>
              We are a company that prioritizes students satisfaction so that we
              can become a favorite company for all companies that use our
              services
            </p>
            <hr className="my-10 bg-[#014751] h-[2px]" />
            <div className="flex items-center justify-between gap-6 mb-16">
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-3xl font-bold ">65</h3>
                <p className="text-sm lg:whitespace-nowrap">
                  Project Completed
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-3xl font-bold ">50+</h3>
                <p className="text-sm lg:whitespace-nowrap">
                  Company work with
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-3xl font-bold ">65+</h3>
                <p className="text-sm lg:whitespace-nowrap">
                  Students connected
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="bg-[#014751] p-4 text-sm font-normal text-[#FFFFFF] rounded-md"
            >
              Create free account
            </Link>
          </div>
        </div>

        {/* ==== Steps Section ==== */}
        <div className="grid grid-cols-2 gap-4 xl:gap-6">
          <div className="bg-[#F2F6F6] border border-slate-300 shadow-sm pt-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
              1
            </p>
            <p className="font-semibold mt-8 md:mt-10 mb-4 text-xl text-[#014751]">
              Vision
            </p>
            <p className="font-light">
              Our goal is to be one of the leading digital transformation
              partners for African governments.
            </p>
          </div>
          <div className="bg-[#F2F6F6] border border-slate-300 shadow-sm py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
              2
            </p>
            <p className="font-semibold mt-8 md:mt-10 mb-4 text-xl text-[#014751]">
              Mission
            </p>
            <p className="font-light">
              Our aim is to consistently offer automation technology platforms
              to geomatic students that drive an outstanding placement offer.
            </p>
          </div>
          <div className="bg-[#F2F6F6] border border-slate-300 shadow-sm py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
              3
            </p>
            <p className="font-semibold mt-8 md:mt-10 mb-4 text-xl text-[#014751]">
              Our Core Values
            </p>
            <p className="font-light">
              Customer Focus, Innovation, Integrity & Respect.
            </p>
          </div>
          <div className="bg-[#F2F6F6] border border-slate-300 shadow-sm py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]">
            <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
              4
            </p>
            <p className="font-semibold mt-8 md:mt-10 mb-4 text-xl text-[#014751]">
              Our Culture
            </p>
            <p className="font-light">
              At Geomatic Connect - create great solutions, help geomatic
              students achieve great increases in placement, and we want to be
              great contributors to our nation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
