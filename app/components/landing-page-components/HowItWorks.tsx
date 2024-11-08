"use client";
import Image from "next/image";
import React from "react";
import Spiral from "@/public/images/spiral.svg";

export default function HowItWorks() {
  return (
    <main className="py-10 xl:px-6 w-full lg:pb-[100px] xl:pb-[260px]">
      {/* ==== Section One ==== */}
      <div className="text-center mb-12">
        <p className="text-xl font-extrabold lg:text-3xl">
          How <span className="text-[#014751]">GeomaticConnect</span> Works?
        </p>
        <p className="text-md lg:text-xl mt-4 w-[250px] mx-auto">
          Trusted by leading brands and companies
        </p>
      </div>

      {/* ==== Steps Section ==== */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 relative">
        
        {/* Step 1 */}
        <div className="text-center relative lg:ml-12 lg:top-16 xl:top-24 xl:ml-12 z-10">
          <div className="bg-[#014751] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4 lg:hidden">
            02
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg font-semibold mb-2">
              Make Payment
            </h3>
            <p className="lg:text-xs xl:text-sm text-gray-600">
            Once you accept our fair all-cash offer, we’ll sign the contract
            and schedule a closing date of your choice.
            </p>
          </div>
        </div>

        {/* Spiral Image */}
        <div className="hidden lg:block absolute inset-0 items-center justify-center">
          <Image
            src={Spiral}
            alt="Spiral Design"
            width={600}
            height={600}
            priority
            className="w-full"
          />
        </div>

        {/* Step 2 */}
        <div className="text-center relative lg:top-16 xl:top-24  z-10">
          <div className="bg-[#014751] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4 lg:hidden">
            02
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg font-semibold mb-2">
              Make Payment
            </h3>
            <p className="lg:text-xs xl:text-sm text-gray-600">
            Once you accept our fair all-cash offer, we’ll sign the contract
            and schedule a closing date of your choice.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="text-center relative lg:top-16 xl:top-24 z-10">
          <div className="bg-[#014751] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4 lg:hidden">
            03
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg font-semibold mb-2">Accept The Offer</h3>
            <p className="lg:text-xs xl:text-sm text-gray-600">
              Once you accept our fair all-cash offer, we’ll sign the contract
              and schedule a closing date of your choice.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="text-center relative z-10 lg:mt-36  lg:right-6 xl:mt-40 xl:top-2 xl:right-4">
          <div className="bg-[#014751] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4 lg:hidden">
            04
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg font-semibold mb-2">Cash in Your Pocket</h3>
            <p className="lg:text-xs xl:text-sm text-gray-600">
              On the closing day, we formally close the transaction, and after a
              few days, you will get all your cash!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
