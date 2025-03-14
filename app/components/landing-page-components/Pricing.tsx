"use client";
import PricingCard from "@/app/components/cards/PricingCard";
import { pricingData } from "@/utils/PricingData";

export default function Pricing() {
  return (
    <>
      <main className="py-10 pb-20 px- w-full">
        {/* ====Section One ==== */}
        <div className="text-center">
          <p className="text-lg md:text-2xl">Our Pricing</p>
          <p className="text-2xl font-bold md:text-3xl xl:text-4xl text-[#014751] mt-3 w-[280px] md:w-[400px] lg:w-[450px] mx-auto">
            We Provide Various Offer Packages For You
          </p>
        </div>
        {/* ====Section Two ==== */}
        <section>
          <div className="mt-10 px-6 md:px-2 space-y-10 md:mt-16 md:space-y-0 flex flex-col items-center md:grid md:grid-cols-2 md:gap-3 lg:gap-10 lg:grid-cols-3 justify-center place-items-center">
            {pricingData.map((item: any) => (
              <div key={item.id}>
                <PricingCard
                  headings={item.headings}
                  subHeadings={item.subHeadings}
                  amount={item.amount}
                  benefit={item.benefit}
                  billingCycle={item.billingCycle}
                  buttonContent={item.buttonContent}
                  popular={item.popular}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
