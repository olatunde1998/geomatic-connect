"use client";
import TestimonialCard from "@/app/components/cards/TestimonialCard";
import Image from "next/image";
import {
  testimonialData,
  testimonialIntegration,
} from "@/utils/TestimonialData";
import { motion } from "framer-motion";

export default function Testimonial() {
  const duplicatedData = [
    ...testimonialData,
    ...testimonialData,
    ...testimonialData,
  ];
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        className="py-14 px-6 xl:py-20 w-full"
      >
        {/* ====Section One ==== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
          className="text-center"
        >
          <p className="text-4xl font-bold md:text-4xl lg:text-5xl text-[#F51767] text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-pink-500">
            Testimonials
          </p>
          <p className="text-base md:text-base text-[#747578] lg:text-lg w-[250px] lg:w-[300px] mx-auto mt-3">
            What Do Happy Clients Say About Working With Us?
          </p>
        </motion.div>
        <section>
          <div className="mx-auto mt-10 md:mt-12 flex gap-3 xl:gap-6">
            <div className="w-full relative overflow-hidden">
              <div className="relative gap-6 flex items-center justify-center animate md:relative left-0 ">
                <div className="gap-6 flex items-center justify-around">
                  {duplicatedData.map((item, index) => (
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                      }}
                      key={index}
                      className="md:py-4 cursor-pointer"
                    >
                      <TestimonialCard
                        imageUrl={item.imageUrl}
                        location={item.location}
                        fullName={item.fullName}
                        testimonial={item.testimonial}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-10 justify-center gap-3 xl:gap-24 opacity-30">
            {testimonialIntegration.map((item, index) => (
              <div key={index}>
                <Image
                  src={item.imageUrl}
                  alt={`${item.name} image`}
                  width={100}
                  height={100}
                  priority
                  quality={100}
                  className="w-[79px] h-[36px] lg:w-[158px] lg:h-[60px] object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </motion.main>
    </>
  );
}
