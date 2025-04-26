"use client";
import { howItWorksData } from "@/utils/HowItWorksData";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const { name, content, data, button } = howItWorksData.howItWork;

  return (
    <>
      <main className="w-full md:grid md:grid-cols-2 md:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
          className="text-[#FFFFFF] lg:mt-10"
        >
          <p className="text-2xl md:text-left font-bold md:text-3xl xl:text-4xl w-[250px] md:w-[100%]">
            {name}
          </p>
          <div className="w-24 h-1 bg-[#FFC957]" />
          <p className="mt-4 md:text-left  text-sm md:text-base font-normal text-[#F0F0F0] lg:w-[500px] my-10 !leading-8">
            {content}
          </p>
          {data.map((item, index) => (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", duration: 3 }}
              key={index}
              className="mt-4 flex items-center font-normal gap-2 md:text-left text-sm md:text-base text-[#F0F0F0] lg:w-[500px]"
            >
              <Check color="#6CB92B" className="size-5 font-bold" />
              {item.content}
            </motion.p>
          ))}
          <div className="mt-10 flex space-x-6 mb-8">
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="border-[#6CB92B] border-[1.3px] shadow-xl bg-[#FFFFFF] p-4 items-center flex justify-center font-bold text-[#014751] rounded-md w-fit text-xs"
              >
                {button}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full h-fit md:h-[350px] lg:w-[400px] xl:w-[550px] xl:h-[350px] mt-12 lg:mt-16">
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            url={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/v1737481250/geomatic-connect/geomatic-demo-veed_vrlz1o.mp4`}
          />
        </div>
      </main>
    </>
  );
}
