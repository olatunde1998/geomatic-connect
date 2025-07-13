"use client";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/images/prototype.png";
import { companionData } from "@/utils/CompanionData";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const duplicatedData = [...companionData, ...companionData, ...companionData];
  return (
    <section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 3 }}
        className="leading-snug pt-16"
      >
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <div className="mb- flex">
            <a href="/blog" rel="noopener noreferrer" className="inline-flex">
              <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
                  New snippets ⚡️
                  <span className="inline-flex items-center pl-2 text-black dark:text-white">
                    Read more{" "}
                    <ArrowRight
                      className="pl-0.5 text-black dark:text-white"
                      size={16}
                    />
                  </span>
                </div>
              </span>
            </a>
          </div>
        </div>
        <div className="text-center px-4">
          <h2 className="text-[48px] md:text-[64px] px-3 md:px-0 font-semibold md:font-bold text-[#F51767] text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-pink-500">
            Start landing offers.
          </h2>
          <p className="text-lg font-medium md:font-semibold px-3 mt-3.5 md:max-w-[500px] lg:max-w-[600px] md:mx-auto text-[#56616e] dark:text-muted-foreground">
            The most efficient and supportive way for you to get connected,
            build real-world skills and advance your career.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-8">
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="w-fit"
          >
            <Button asChild variant="secondary" className="p-5 relative group">
              <Link href="/signup" className="relative">
                <span>Create free account</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
          >
            <Button
              asChild
              variant="outline"
              className="p-5 hidden md:bloc md:flex items-center"
            >
              <Link href="/blog">Explore career tips</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ===Hero Image section === */}
      <div className="lg:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
          className="relative  w-[80%] mx-auto mt-16 h-[250px] md:w-[90%] md:h-[450px] lg:w-[80%] lg:h-[610.44px] xl:h-[710px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
        >
          <Image
            src={HeroImage}
            alt="application prototype picture"
            fill
            priority
            className="rounded-lg border-[0.5px] border-slate-300 object-contain dark:object-fill dark:invert"
          />
        </motion.div>
      </div>

      {/* ===Hiring Companies=== */}
      <div className="mt-10 md:mt-20 lg:mb-8 md:pb-16 lg:pb-0">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 3 }}
            className="px-[20px] py-[10px] text-center max-w-[1500px] mx-auto lg:py-[10px]"
          >
            <h2 className="text-xl text-left leading-8 font-bold mb-[40px] md:text-[32px] lg:text-4xl md:text-center lg:max-w-[700px] xl:max-w-[850px] font-sans mx-auto md:leading-10 lg:leading-[52px]">
              Our students are getting hired by top companies. We can help you
              too.
            </h2>
            <div className="mx-auto md:h-[80px]">
              <div className="w-full relative overflow-hidden pt-6 md:pt-10">
                <div className="relative flex items-center justify-center animate md:relative left-0">
                  <div className="w-[150%] flex items-center justify-around">
                    {duplicatedData.map((item, index) => (
                      <motion.div
                        whileHover={{
                          scale: 1.3,
                        }}
                        key={index}
                        className="w-[50px] h-[50px] md:w-[80px] md:h-[90px] lg:h-[120px] mx-6 py-4 cursor-pointer"
                      >
                        <Image
                          src={item?.imageUrl}
                          width={70}
                          height={70}
                          priority
                          alt="Company brand logo"
                          className="w-auto h-auto dark:invert"
                          quality={100}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </section>
  );
}
