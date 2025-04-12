"use client";
import { whoWeAreAnalyticsData, whoWeAreData } from "@/utils/WhoWeAreData";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", duration: 3 }}
              className="text-base leading-8 md:text-base md:leading-8"
            >
              We are a company that prioritizes students satisfaction so that we
              can become a favorite company for all companies that use our
              services
            </motion.p>
            <hr className="my-10 bg-[#014751] h-[2px]" />
            <div className="flex items-center justify-between gap-6 mb-16">
              {whoWeAreAnalyticsData.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", duration: 3 }}
                  key={index}
                  className="flex flex-col items-center justify-center gap-3"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {item.totalCount}
                  </h3>
                  <p className="text-base text-center lg:whitespace-nowrap">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:hover:bg-primary-foreground p-4 text-sm font-normal text-[#FFFFFF] rounded-md"
              >
                Create free account
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ==== Steps Section ==== */}
        <div className="grid grid-cols-2 gap-4 xl:gap-6">
          {whoWeAreData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              animate={{ x: 0 }}
              transition={{ type: "spring", duration: 3 }}
              key={index}
              className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[250px]"
            >
              <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
                <item.iconUrl size={32} />
              </p>
              <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
                {item.title}
              </p>
              <p className="font-light leading-6 dark:text-muted-foreground">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
