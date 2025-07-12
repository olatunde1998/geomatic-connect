"use client";
import { faqData } from "@/utils/FaqData";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState(1);
  return (
    <>
      <main className="relative py-8 px-6   w-full rounded-tl-[32px] rounded-br-[32px] pb-16">
        {/* ===== Background Image ===== */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url(/images/globe-refine.png)] "></div>
        {/* =====Overlay with color and opacity==== */}
        <div className="absolute inset-0 bg-[#014751] dark:border-muted dark:bg-slate-950 dark:border dark:opacity-100 opacity-95 rounded-tl-[32px] rounded-br-[32px]"></div>
        {/* ====Section One (CONTENT)==== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative"
        >
          <p className="text-center text-4xl uppercase  font-extrabold md:text-3xl text-white xl:text-4xl dark:text-[#F51767] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-cyan-800 to-pink-500">
            faq<span className="lowercase">s</span>
          </p>
          <p className="text-center text-md lg:text-lg xl:text-xl mt-3 text-[#FFFFFF]">
            Frequently Asked Questions
          </p>
          {faqData.map((faq: any, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              key={index}
              onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
              className={`${
                activeFaq === faq.id
                  ? "bg-[#FFFFFF] dark:bg-muted-foreground mt-10 text-[#014751]  p-4 md:p-8 lg:p-10 rounded-tl-[32px] rounded-br-[32px]"
                  : "text-[#FFFFFF] mt-10  p-4 md:p-8 lg:px-10 lg:py-4 border-b-[0.3px] border-slate-200 dark:border-b dark:border-muted"
              } flex justify-between  max-w-[1100px] mx-auto cursor-pointer`}
            >
              <div>
                <p
                  className={`${
                    activeFaq !== faq.id ? "font-normal" : "font-medium"
                  } text-base lg:text-xl font-medium`}
                >
                  Q{faq.id}- <span className="ml-4">{faq.question}</span>
                </p>
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    activeFaq === faq.id
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-sm lg:text-base mt-4 dark:text-secondary"
                >
                  {faq.answer}
                </motion.p>
              </div>
              <div className="cursor-pointer">
                {activeFaq === faq.id ? <Minus /> : <Plus />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
}
