"use client";

import Image from "next/image";
import PricingCard from "@/app/components/cards/PricingCard";

export default function Pricing() {
  return (
    <>
      <main className="py-10 pb-20 px- w-full">
        {/* ====Section One ==== */}
        <div className="text-center">
          <p className="text-md lg:text-2xl">Our Pricing</p>
          <p className="text-xl font-bold lg:text-3xl text-[#014751] mt-3 w-[280px] md:w-[450px] mx-auto">
            We Provide Various Offer Packages For You
          </p>
        </div>
        {/* ====Section Two ==== */}
        <section>
          <div className="mt-10 space-y-10 md:mt-16 md:space-y-0 flex flex-col items-center md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 justify-center">
            <PricingCard />
            <PricingCard />
            <PricingCard />
          </div>
        </section>
      </main>
    </>
  );
}