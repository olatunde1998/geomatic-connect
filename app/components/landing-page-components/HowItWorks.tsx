"use client";
import { howItWorksData } from "@/utils/HowItWorksData";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { name, content, data } = howItWorksData.howItWork;

  return (
    <>
      <main className="w-full md:grid lg:grid-cols-2 lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 3 }}
          className="text-secondary-foreground lg:mt-10"
        >
          <p className="text-2xl md:text-left font-bold md:text-3xl xl:text-4xl w-[250px] md:w-[100%]">
            {name}
          </p>
          <div className="w-24 h-1 bg-[#FFC957]" />
          <p className="mt-4 md:text-left  text-sm md:text-base font-normal text-muted-foreground dark:text-muted-foreground lg:w-[500px] my-10 !leading-8">
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
              className="mt-4 flex items-center font-normal gap-2 md:text-left text-sm md:text-base text-muted-foreground  dark:text-muted-foreground lg:w-[500px]"
            >
              <span className="text-20 text-xl ">&#128640;</span>
              {item.content}
            </motion.p>
          ))}
        </motion.div>

        <div className="w-full h-fit md:h-[350px] lg:w-[400px] xl:w-[550px] xl:h-[350px] mt-12 lg:my-16">
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
