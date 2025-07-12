"use client";
import PricingCard from "@/app/components/cards/PricingCard";
import { monthlyPricingData, yearlyPricingData } from "@/utils/PricingData";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Pricing() {
  const [selectedBillingCycleTab, setSelectedBillingCycleTab] =
    useState("Monthly");

  const pricingData =
    selectedBillingCycleTab === "Monthly"
      ? monthlyPricingData
      : yearlyPricingData;
  return (
    <>
      <main className="py-10 pb-20 px- w-full">
        {/* ====Section One ==== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
          className="text-center"
        >
          <p className="text-lg md:text-2xl">Our Pricing</p>
          <p className="text-3xl font-bold xl:text-4xl text-[#F51767] text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-pink-500 mt-3 w-[280px] md:w-[400px] lg:w-[450px] mx-auto">
            We Provide Various Offer Packages For You
          </p>
          <div className="mt-6 border-[1.3px] border-slate-200 dark:border-muted flex justify-between items-center text-xs md:text-sm p-1 rounded-3xl w-[200px] mx-auto">
            <p
              onClick={() => setSelectedBillingCycleTab("Monthly")}
              className={`${
                selectedBillingCycleTab === "Monthly"
                  ? "text-[#FFFF] bg-[#155464] dark:bg-secondary-foreground dark:text-muted"
                  : "text-slate-300"
              } py-1.5 font-medium rounded-3xl text-center w-1/2 cursor-pointer`}
            >
              Monthly
            </p>
            <p
              onClick={() => setSelectedBillingCycleTab("Yearly")}
              className={`${
                selectedBillingCycleTab === "Yearly"
                  ? "text-[#FFFF] bg-[#155464] dark:bg-secondary-foreground dark:text-muted"
                  : "text-slate-300"
              }  py-1.5 font-medium rounded-3xl text-center w-1/2 cursor-pointer`}
            >
              Yearly
            </p>
          </div>
        </motion.div>
        {/* ====Section Two ==== */}
        <section>
          <div className="mt-10 px-6 md:px-2 space-y-10 md:mt-14 md:space-y-0 flex flex-col items-center md:grid md:grid-cols-2 md:gap-3 lg:gap-10 lg:grid-cols-3 justify-center place-items-center">
            {pricingData.map((item: any, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  // boxShadow: "0px 0px 8px rgb(255, 255, 255)",
                }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 3 }}
                key={index}
              >
                <PricingCard
                  headings={item.headings}
                  subHeadings={item.subHeadings}
                  amount={item.amount}
                  benefit={item.benefit}
                  billingCycle={item.billingCycle}
                  buttonContent={item.buttonContent}
                  popular={item.popular}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
