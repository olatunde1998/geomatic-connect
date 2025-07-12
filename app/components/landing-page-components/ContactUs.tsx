"use client";
import Contact from "@/public/images/contact.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  return (
    <>
      <main className="px-3 grid grid-cols-2 lg:flex lg:gap-10 xl:gap-0">
        {/* ====Section One ==== */}
        <section className="mt-8">
          <div className="lg:w-[400px]">
            <Image
              src={Contact}
              alt="Contact us picture"
              width={500}
              height={500}
              priority
              className="w-[200px] h-[200px] object-contain lg:object-cover md:w-[430px] md:h-[270px]"
            />
          </div>
        </section>

        {/* ====Section Two ==== */}
        <section className="xl:flex mt-8 md:mt-10 lg:mt-20 ">
          <div className="text-base  font-bold lg:text-2xl xl:text-3xl text-[#014751] dark:text-card-foreground md:mt-3 md:w-[300px]">
            We&apos;ll Connect You With in 48hours.
          </div>
          <div className="lg:flex gap-3 h-fit mt-6 xl:ml-28">
            <motion.a
              whileHover={{
                scale: 1.03,
                // boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              href="https://api.whatsapp.com/send/?phone=2348133642798&text=Welcome+to+Geomatic+Connect%2C+please+ask+me+any+question+regarding+our+products+and+services&type=phone_number&app_absent=0"
              target="_blank"
              className="p-3 lg:p-4 bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:hover:bg-primary-foreground text-[#FFFFFF] rounded-xl dark:rounded-lg w-[150px] md:w-[180px] text-center flex items-center justify-center cursor-pointer text-sm"
            >
              Contact Us
            </motion.a>
            <motion.div
              whileHover={{
                scale: 1.03,
                // boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="p-3 lg:p-4 mt-2 md:mt-3 lg:mt-0 bg-[#FFFFFF] text-xs border-[1.3px] border-[#014751] text-[#014751] rounded-xl w-[150px] md:w-[180px] text-center flex items-center justify-center font-semibold cursor-pointer"
              >
                Register Now
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
