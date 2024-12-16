"use client";
import React from "react";

export default function HowItWorksTwo() {
  return (
    <main className="py-10 xl:px-6 w-full lg:pb-[100px] lg:pt-[60px] ">
      {/* ==== Section One ==== */}
      <div className="text-center mb-12">
        <p className="text-xl font-extrabold md:text-3xl xl:text-4xl w-[250px] md:w-[100%] mx-auto">
          How <span className="text-[#014751]">GeomaticConnect</span> Works?
        </p>
        <p className="text-md md:text-lg lg:text-xl mt-4 w-[250px] mx-auto">
          Trusted by leading brands and companies
        </p>
      </div>

      {/* ==== Steps Section ==== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 place-items-center gap-4 xl:gap-6 mx-4">
        <div className="bg-[#F2F6F6] border border-slate-300 p-6 rounded-lg max-w-[300px] md:h-[300px]">
          <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
            1
          </p>
          <p className="font-medium mt-10 mb-4 text-base">
            Create Your Free Account with us
          </p>
          <p className="font-light">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
        <div className="bg-[#F2F6F6] border border-slate-300 p-6 rounded-lg max-w-[300px] md:h-[300px]">
          <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
            2
          </p>
          <p className="font-medium mt-10 mb-4 text-base">
            Login with your Free Account
          </p>
          <p className="font-light">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
        <div className="bg-[#F2F6F6] border border-slate-300 p-6 rounded-lg max-w-[300px] md:h-[300px]">
          <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
            3
          </p>
          <p className="font-medium mt-10 mb-4 text-base">Verify Your Email Address</p>
          <p className="font-light">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
        <div className="bg-[#F2F6F6] border border-slate-300 p-6 rounded-lg max-w-[300px] md:h-[300px]">
          <p className="text-2xl text-[#014751] font-bold border border-[#014751] p-4 rounded-full bg-white w-10 h-10 text-center flex justify-center items-center">
            4
          </p>
          <p className="font-medium mt-10 mb-4 text-base">
            Make Request to your desire Company
          </p>
          <p className="font-light">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
      </div>
    </main>
  );
}
